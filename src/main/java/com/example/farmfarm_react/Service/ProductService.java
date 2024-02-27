package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.Cart.Item;
import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserService userService;

    // 상품 등록
    public ProductEntity saveProduct(ProductEntity product, FarmEntity farm) throws ParseException {
        ProductEntity addProduct = product;
        if (product.getType() == 1){
            product.setGroup(true);
            product.setAuction(false);
        }
        else if (product.getType() == 2) {
            product.setAuction(true);
            product.setGroup(false);
        }
        else {
            product.setGroup(false);
            product.setAuction(false);
        }
        addProduct.setFarm(farm);
        if (addProduct.isAuction()) {
            if (farm.isAuction() == true) { // 경매 농장일 경우 auction_quantity 설정
                addProduct.setAuction_quantity(product.getQuantity());
                Calendar cal = Calendar.getInstance();
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
                cal.set(Calendar.YEAR, product.getDate().getYear() + 1900);
                cal.set(Calendar.MONTH, product.getDate().getMonth());
                cal.set(Calendar.DATE, product.getDate().getDate());
                cal.set(Calendar.HOUR_OF_DAY, product.getHour());
                cal.set(Calendar.MINUTE, product.getMinute());
                String closeDate = format.format(cal.getTime());
                addProduct.setCloseCalendar(closeDate);

                addProduct.setDate(format.parse(closeDate));
            } else { // 경매 농장이 아닐 경우 예외처리(추후에 설정)
                return null;
            }
        }
        addProduct.setStatus("yes");
        return productRepository.save(addProduct);
    }

    // 상품 상세 조회
    public ProductEntity getProduct(Long p_id){
        ProductEntity product = productRepository.findBypIdAndStatusLike(p_id, "yes");
        return product;
    }

    // 일반 상품 리스트 조회(신상품순 - 기본)
    public List<ProductEntity> getAllProduct() {
        List<ProductEntity> productList =  (List<ProductEntity>) productRepository.findAllByStatusLike(Sort.by(Sort.Direction.DESC, "pId"), "yes");
        List<ProductEntity> resultList = new ArrayList<>();
        for (ProductEntity val : productList) {
            if (!val.isAuction()) {
                resultList.add(val);
            }
        }
        return resultList;
    }

    public List<ProductEntity> getAllAuctionProduct() {
        List<ProductEntity> productList =  (List<ProductEntity>) productRepository.findAllByStatusLike(Sort.by(Sort.Direction.DESC, "pId"), "yes");
        List<ProductEntity> resultList = new ArrayList<>();
        for (ProductEntity val : productList) {
            if (val.isAuction()) {
                resultList.add(val);
            }
        }
        return resultList;
    }

    // 농장별 상품 리스트 조회
    public List<ProductEntity> getFarmProduct(FarmEntity farm) {
        return productRepository.findAllByFarmAndStatusLike(farm, "yes");
    }

    // 상품 수정
    public ProductEntity updateProduct(HttpServletRequest request, Long p_id, ProductEntity product) {
        UserEntity user = userService.getUser(request);
        ProductEntity newProduct = productRepository.findBypIdAndStatusLike(p_id, "yes");

        // 수정 항목
        // 이름, 상세정보, 이미지, 수량, 가격, 직거래장소, 경매최저가격
        if (Objects.equals(user.getUId(), newProduct.getFarm().getUser().getUId())) {
            newProduct.setName(product.getName());
            newProduct.setDetail(product.getDetail());
            newProduct.setImage1(product.getImage1());
            newProduct.setImage2(product.getImage2());
            newProduct.setImage3(product.getImage3());
            newProduct.setQuantity(product.getQuantity());
            newProduct.setPrice(product.getPrice());
            newProduct.setDirect_location(product.getDirect_location());
            newProduct.setLow_price(product.getLow_price());
            return productRepository.save(newProduct);
        }
        else {
            return null;
        }
    }

    // 상품 삭제
    public void deleteProduct(HttpSession session, Long p_id) throws Exception{
        UserEntity user = (UserEntity)session.getAttribute("user");
        ProductEntity product = productRepository.findBypIdAndStatusLike(p_id, "yes");
        System.out.println("유저는 ? " + product.getFarm().getUser().getUId()); //
        if (Objects.equals(user.getUId(), product.getFarm().getUser().getUId())) {
            product.setStatus("no");
            productRepository.save(product);
        }
        else {
            throw new Exception();
        }
    }

    // 상품 검색
    public List<ProductEntity> getSearchProduct(String keyword) {
        List<ProductEntity> productList = productRepository.findByNameContainingAndStatusLike(keyword, "yes");
        return productList;
    }

    // 상품 정렬 (인기순, 낮은 가격순, 높은 가격순)
    public List<ProductEntity> getSortedProduct(String sort) {
        List<ProductEntity> productList;
        switch (sort) {
            case "rating":
                productList = productRepository.findAllByStatusLikeOrderByRatingDesc("yes");
                break;
            case "lowPrice":
                productList = productRepository.findAllByStatusLikeOrderByPriceAsc("yes");
                break;
            case "highPrice":
                productList = productRepository.findAllByStatusLikeOrderByPriceDesc("yes");
                break;
            default:
                productList = (List<ProductEntity>) productRepository.findAllByStatusLike(Sort.by(Sort.Direction.DESC, "p_id"), "yes");
                break;
        }
        return productList;
    }

}
