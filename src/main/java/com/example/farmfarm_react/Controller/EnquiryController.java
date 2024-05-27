package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Service.EnquiryService;
import com.example.farmfarm_react.Service.ProductService;
import com.example.farmfarm_react.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/enquiry")
public class EnquiryController {
    @Autowired
    EnquiryService enquiryService;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;

    //문의사항 작성
    @PostMapping("/{p_id}")
    @ResponseBody
    public List<EnquiryEntity> createEnquiry(HttpSession session, @PathVariable("p_id") long pId, @RequestBody EnquiryEntity enquiry) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        ProductEntity product = productService.getProduct(pId);
        EnquiryEntity newEnquiry = enquiryService.saveEnquiry(user, product, enquiry);
        List<EnquiryEntity> enquiryList = enquiryService.getProductEnquiry(pId);
        return enquiryList;
    }

    //문의사항 수정
    @PutMapping("/{e_id}")
    public ResponseEntity<Object> putEnquiry(HttpSession session, @PathVariable("e_id") long eId, @RequestBody EnquiryEntity enquiry) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        EnquiryEntity updateEnquiry = enquiryService.updateEnquiry(user, eId, enquiry);
        if (updateEnquiry == null) {
            return ResponseEntity.badRequest().body("user not match");
        }
        return ResponseEntity.ok().body(updateEnquiry);
    }

    //문의사항 삭제
    @DeleteMapping("/{e_id}")
    public ResponseEntity<Object> deleteEnquiry(HttpSession session, @PathVariable("e_id") long eId) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        try {
            enquiryService.deleteEnquiry(user, eId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("exception");
        }
        return ResponseEntity.ok().body("문의사항 삭제 완료");
    }

    //상품별 문의사항 조회
    @GetMapping("/{p_id}")
    public ModelAndView getProductEnquiry(HttpSession session, @PathVariable("p_id") long pId) {
        ModelAndView mav = new ModelAndView("home/product/productDetails");
        List<EnquiryEntity> productEnquiry = enquiryService.getProductEnquiry(pId);
        ProductEntity product = productService.getProduct(pId);
        List<EnquiryEntity> publicEnquiry = new ArrayList<>();
        UserEntity user = (UserEntity)session.getAttribute("user");
        if (user != product.getFarm().getUser()) { // 농장 주인이 아닐 때
            for (EnquiryEntity enquiry : productEnquiry) {
                if(!enquiry.isSecret()) {
                    publicEnquiry.add(enquiry);
                }
            }
            System.out.println("비밀글 제외 상품별 문의사항 조회");
            mav.addObject("enquiries", publicEnquiry);
        }
        else { // 농장 주인일 때
            System.out.println("농장 주인 : 상품별 문의사항 조회");
            mav.addObject("enquiries", productEnquiry);
        }
        return mav;
    }

    //내가 쓴 문의사항 보기 - 리스트일듯
    @GetMapping("/my")
    public ResponseEntity<Object> getMyEnquiry(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

        List<EnquiryEntity> myEnquiry = enquiryService.getMyEnquiry(session);
        System.out.println("내가 쓴 문의사항 조회");
        return ResponseEntity.ok().body(myEnquiry);
    }

}