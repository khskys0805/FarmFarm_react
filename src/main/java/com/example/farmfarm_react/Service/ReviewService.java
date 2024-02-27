package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Repository.EnquiryRepository;
import com.example.farmfarm_react.Repository.OrderDetailRepository;
import com.example.farmfarm_react.Repository.ReviewRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;
    @Autowired
    OrderDetailService orderDetailService;

    //리뷰 작성
    public ReviewEntity saveReview(UserEntity user, OrderDetailEntity orderDetail, ReviewEntity review) {
        review.setUser(user);
        review.setOrderDetail(orderDetail);
        review.setFarmStar(review.getFarmStar());
        review.setProductStar(review.getProductStar());
        review.setComment(review.getComment());
        return reviewRepository.save(review);
    }

    //리뷰 수정
    public ReviewEntity updateReview(UserEntity user, Long rpId, ReviewEntity review) {
        ReviewEntity newReview = reviewRepository.findByRpId(rpId);
        System.out.print(newReview);
        if (Objects.equals(user.getUId(), newReview.getUser().getUId())) {
            newReview.setComment(review.getComment());
            newReview.setProductStar(newReview.getProductStar());
            newReview.setFarmStar(newReview.getFarmStar());
            reviewRepository.save(newReview);
            return newReview;
        }
        else
            return null;
    }

    //리뷰 삭제
    public void deleteReview(UserEntity user, Long rpId) throws Exception{
        ReviewEntity review = reviewRepository.findByRpId(rpId);
        if (Objects.equals(user.getUId(), review.getUser().getUId())) {
            reviewRepository.delete(review);
        } else {
            System.out.println("사용자 불일치");
            throw new Exception();
        }
    }

    //상품별 리뷰 조회
    public List<ReviewEntity> getProductReview(Long pId) {
        //전체 리뷰 가져와
        List<ReviewEntity> allReview = reviewRepository.findAll();
        List<ReviewEntity> productReview = new ArrayList<>();
        for (ReviewEntity review : allReview) {
            if (review.getOrderDetail().getProduct().getPId() == pId) {
                productReview.add(review);
            }
        }
        return productReview;
    }

    //내가 쓴 리뷰 조회
    public List<ReviewEntity> getMyEnquiry(HttpSession session) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        return reviewRepository.findByUser(user);
    }
}