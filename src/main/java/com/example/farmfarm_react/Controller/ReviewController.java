package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;
    @Autowired
    UserService userService;
    @Autowired
    OrderDetailService orderDetailService;
    @Autowired
    ProductService productService;

    @GetMapping("/write")
    public ModelAndView getReviewForm(@ModelAttribute("orderDetail")OrderDetailEntity orderDetail) {
        ModelAndView mav = new ModelAndView("myPage/writeReview");
        mav.addObject("orderDetail", orderDetail);
        return mav;
    }

    //리뷰 작성
    @ResponseBody
    @PostMapping("/{od_id}")
    public ResponseEntity<Object> createReview(HttpSession session, @PathVariable("od_id") long odId, @RequestBody ReviewEntity review) {
        System.out.println(review.getProductStar());
        System.out.println(review.getFarmStar());
        System.out.println(review.getUser());
        UserEntity user = (UserEntity)session.getAttribute("user");
        OrderDetailEntity orderDetail = orderDetailService.getOrderDetail(odId);
        System.out.println("pId" + orderDetail.getProduct().getPId());
        ReviewEntity newReview = reviewService.saveReview(user, orderDetail, review);
        return ResponseEntity.ok().body(newReview);
    }

    //리뷰 수정
    @PutMapping("/{rp_id}")
    public ResponseEntity<Object> putEnquiry(HttpSession session, @PathVariable("rp_id") long rpId, @RequestBody ReviewEntity review) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        ReviewEntity updateReview = reviewService.updateReview(user, rpId, review);
        if (updateReview == null) {
            return ResponseEntity.badRequest().body("user not match");
        }
        return ResponseEntity.ok().body(updateReview);
    }

    //리뷰 삭제
    @DeleteMapping("/{rp_id}")
    public ResponseEntity<Object> deleteReview(HttpSession session, @PathVariable("rp_id") long rpId) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        try {
            reviewService.deleteReview(user, rpId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("exception");
        }
        return ResponseEntity.ok().body("리뷰 삭제 완료");
    }

    //상품별 리뷰 조회
    @GetMapping("/{p_id}")
    public ModelAndView getProductReview( @PathVariable("p_id") long pId) {
        List<ReviewEntity> productReview = new ArrayList<>();
        ModelAndView mav = new ModelAndView("home/product/productDetails");
        productReview = reviewService.getProductReview(pId);
        System.out.println("상품별 리뷰 조회");
        System.out.println(productReview);
        mav.addObject("reviews", productReview);
        return mav;
    }

    //내가 쓴 리뷰 보기
    @GetMapping("/my")
    public ModelAndView getMyReview(HttpSession session) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        List<ReviewEntity> myReview = new ArrayList<>();
        ModelAndView mav = new ModelAndView("myPage/myReviewList");
        myReview = reviewService.getMyEnquiry(session);
        System.out.println("내가 쓴 리뷰 조회");
        System.out.println(myReview);
        mav.addObject("reviews", myReview);
        return mav;
    }
}