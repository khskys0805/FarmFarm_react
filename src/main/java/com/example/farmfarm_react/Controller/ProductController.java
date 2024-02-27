package com.example.farmfarm_react.Controller;


import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Entity.Cart.Cart;
import com.example.farmfarm_react.Entity.Cart.Item;
import com.example.farmfarm_react.Service.*;
import org.hibernate.procedure.ProcedureOutputs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller

@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private FarmService farmService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private EnquiryService enquiryService;
    @Autowired
    private GroupService groupService;

    //43번째 줄 널포인터 익셉션 떠서 주석처리함
    // 상품 등록 Form
    @GetMapping("")
    public ModelAndView getProductForm(HttpSession session, @ModelAttribute("product")ProductEntity product) {
        FarmEntity farm = (FarmEntity)session.getAttribute("myFarm");
        ModelAndView mav = new ModelAndView("home/product/registerProduct");
//        mav.addObject("farm", farm);
        return mav;
    }

    // 상품 등록
    @ResponseBody
    @PostMapping("")
    public ResponseEntity<Object> registerProduct(@RequestHeader("uid") String headerUId, HttpServletRequest request, @RequestBody ProductEntity product, HttpSession session) throws ParseException {
        UserEntity user = (UserEntity)session.getAttribute("user");
        if (user == null) {
            long huid = Long.parseLong(headerUId);
            user = userService.findByUId(huid);
            System.out.println("로그인 풀림ㅋ");
            System.out.println(user);
            session.setAttribute("user", user);
        }
        FarmEntity myFarm = farmService.getMyFarm(user);
        FarmEntity farm = (FarmEntity)session.getAttribute("myFarm");
        if (farm.getFId() == myFarm.getFId()) {
            ProductEntity newProduct = productService.saveProduct(product, myFarm);
            if (newProduct == null) { // 나중에 적절하게 수정
                return null;
            }
            return ResponseEntity.ok().body(newProduct);
        }
        return null;
    }

    // 상품 조회 (일반 상품일 경우 detail 페이지로, 경매 상품일 경우 경매 참여 form으로
    @GetMapping("/{p_id}")
    public ModelAndView getProduct(@PathVariable("p_id") long p_id, HttpSession session) {
        ProductEntity product = productService.getProduct(p_id);
        List<ReviewEntity> reviewList = new ArrayList<>();
        reviewList =  reviewService.getProductReview(p_id);
        System.out.println(reviewList);
        List<EnquiryEntity> enquiryList = new ArrayList<>();
        enquiryList = enquiryService.getProductEnquiry(p_id);
        ModelAndView mav_general = new ModelAndView("home/product/productDetails");
        ModelAndView mav_auction = new ModelAndView("home/auction/auctionDetail");
        mav_general.addObject("product", product);
        mav_general.addObject("reviews", reviewList);
        mav_general.addObject("enquiries", enquiryList);
        List<GroupEntity> groups = groupService.findByProduct(product);
        mav_general.addObject("groups", groups);
        mav_auction.addObject("product", product);
        mav_auction.addObject("reviews", reviewList);
        if (product.isAuction()) { // 경매일 경우
            return mav_auction;
        }
        else { // 일반일 경우
            return mav_general;
        }
    }

    // 상품 리스트 조회, 검색, 정렬(신상품순-기본, 인기순, 낮은 가격순, 높은 가격순)
    @GetMapping("/list")
    public ModelAndView getAllProduct(@RequestParam(value="keyword", required=false) String keyword, @RequestParam(value="sort", required=false) String sort){
        List<ProductEntity> productList;
        List<ProductEntity> resultList = new ArrayList<>();
        ModelAndView mav;

        if (!StringUtils.isEmpty(keyword)) { // 키워드 검색
            mav = new ModelAndView("search/search");
            productList = productService.getSearchProduct(keyword);
        }
        else if (!StringUtils.isEmpty(sort)) { // 정렬
            mav = new ModelAndView("home/product/allProduct");
            productList = productService.getSortedProduct(sort);
        }
        else {
            mav = new ModelAndView("home/product/allProduct");
            productList = productService.getAllProduct();
        }
        for (ProductEntity val : productList) {
            if (val.isAuction() == false) {
                resultList.add(val);
            }
        }
        mav.addObject("productList", resultList);
        return mav;
    }

    // 상품 수정
    @PutMapping("/{p_id}")
    public ResponseEntity<Object> putProduct(HttpServletRequest request, @PathVariable("p_id") long p_id, @RequestBody ProductEntity product) {
        ProductEntity updateProduct = productService.updateProduct(request, p_id, product);
        if (updateProduct == null){
            return ResponseEntity.badRequest().body("user not match");
        }
        return ResponseEntity.ok().body(updateProduct);
    }

    // 상품 삭제
    @DeleteMapping("/{p_id}")
    public ResponseEntity<Object> deleteProduct(HttpSession session, @PathVariable("p_id") long p_id) {
        try {
            productService.deleteProduct(session, p_id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("user not match");
        }
        return ResponseEntity.ok().body("delete OK");
    }

    // 장바구니(세션)에 상품 담기
    @PostMapping("/{p_id}/cart")
    @ResponseBody
    public Cart addToCart(@PathVariable("p_id") long p_id, HttpSession session, @RequestBody Map<String, Integer> requestBody) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        ProductEntity product = productService.getProduct(p_id);
        Item item = new Item();
        Cart cart = (Cart)session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        if (!(cart.getItemList().isEmpty())){
            if (cart.getItemList().get(0).getProduct().getFarm().getFId() != product.getFarm().getFId()) {  // 같은 농장 상품인지 확인 필요. 다르다면 X
                return null;
            }
        }
        item.setU_id(user.getUId());
        item.setP_id(product.getPId());
        item.setQuantity(requestBody.get("quantity"));
        item.setProduct(product);
        cart.push(item);
        session.setAttribute("cart", cart);
        return cart;
    }

    // 장바구니로 이동해서 담은 상품 조회하기
    @GetMapping("/cart")
    public ModelAndView forwardToCart(HttpSession session) {
        ModelAndView mav = new ModelAndView("/home/product/shoppingCart");
        List<Item> itemList = new ArrayList<>();
        Cart cart = (Cart)session.getAttribute("cart");
        if (cart != null) {
            for (Item i : cart.getItemList()) {
                itemList.add(i);
            }
        }
        mav.addObject("itemList", itemList);
        return mav;
    }

    // 경매 상품 리스트 조회
    @GetMapping("/auction/list")
    public ModelAndView getAllAuctionProduct(@RequestParam(value="keyword", required=false) String keyword, @RequestParam(value="sort", required=false) String sort){
        List<ProductEntity> productList;
        List<ProductEntity> resultList = new ArrayList<>();
        ModelAndView mav = new ModelAndView("home/auction/auctionList");

        if (!StringUtils.isEmpty(keyword)) { // 키워드 검색
            productList = productService.getSearchProduct(keyword);
        }
        else if (!StringUtils.isEmpty(sort)) { // 정렬
            productList = productService.getSortedProduct(sort);
        }
        else {
            productList = productService.getAllAuctionProduct();
        }
        for (ProductEntity val : productList) {
            if (val.isAuction() && val.getOpen_status() != 2) {
                resultList.add(val);
            }
        }
        mav.addObject("productList", resultList);
        return mav;
    }
    @GetMapping("/{p_id}/group")
    public void getGroupList(HttpSession session, @PathVariable("p_id") long pId, Model model) {
        ProductEntity product = productService.getProduct(pId);
        UserEntity user = (UserEntity)session.getAttribute("user");
        List<GroupEntity> groups = groupService.findByProduct(product);
        model.addAttribute("groups", groups);
    }

    @DeleteMapping("/cart/delete/{p_id}")
    public ResponseEntity<Object> deleteFromCart(HttpSession session, @PathVariable("p_id") long p_id) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        try {
            Cart cart = (Cart)session.getAttribute("cart");
            cart.delete(p_id);
            session.setAttribute("cart", cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("exception");
        }
        return ResponseEntity.ok().body("장바구니 삭제 완료");
    }

}