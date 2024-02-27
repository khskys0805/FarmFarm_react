package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.EnquiryEntity;
import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EnquiryService {
    @Autowired
    EnquiryRepository enquiryRepository;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;

    //문의사항 작성
    public EnquiryEntity saveEnquiry(UserEntity user, ProductEntity product, EnquiryEntity enquiry) {
        enquiry.setUser(user);
        enquiry.setProduct(product);
        return enquiryRepository.save(enquiry);
    }

    //문의사항 수정
    public EnquiryEntity updateEnquiry(UserEntity user, Long eId, EnquiryEntity enquiry) {
        EnquiryEntity newEnquiry = enquiryRepository.findByeId(eId);
        System.out.print(newEnquiry);
        if (Objects.equals(user.getUId(), newEnquiry.getUser().getUId())) {
            newEnquiry.setContent(enquiry.getContent());
            newEnquiry.setSecret(enquiry.isSecret());
            newEnquiry.setCreated_at(enquiry.getCreated_at());
            enquiryRepository.save(newEnquiry);
            return newEnquiry;
        }
        else
            return null;
    }

    //문의사항 삭제
    public void deleteEnquiry(UserEntity user, Long eId) throws Exception{
        EnquiryEntity en = enquiryRepository.findByeId(eId);
        if (Objects.equals(user.getUId(), en.getUser().getUId())) {
            enquiryRepository.delete(en);
        } else {
            throw new Exception();
        }
    }

    //상품별 문의사항 가져오기
    public List<EnquiryEntity> getProductEnquiry(Long pId) {
        ProductEntity product = productService.getProduct(pId);
        return enquiryRepository.findByProduct(product);
    }

    //나의 문의사항 가져오기
    public List<EnquiryEntity> getMyEnquiry(HttpSession session) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        return enquiryRepository.findByUser(user);
    }
}