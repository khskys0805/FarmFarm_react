package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.OrderDetailEntity;
import com.example.farmfarm_react.Entity.OrderEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Entity.kakaoPay.KakaoReadyResponse;
import com.example.farmfarm_react.Entity.kakaoPay.RefundPaymentEntity;
import com.example.farmfarm_react.Repository.ApprovePaymentRepository;
import com.example.farmfarm_react.Repository.OrderRepository;
import com.example.farmfarm_react.Service.OrderService;
import com.example.farmfarm_react.Service.PaymentService;
import com.example.farmfarm_react.Service.UserService;
import org.h2.engine.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/pay")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;


    @PostMapping("/order/{oId}")
    public ResponseEntity<Object> pay(HttpSession session, @PathVariable("oId") long oId)  {
        UserEntity current = (UserEntity)session.getAttribute("user");
        OrderEntity order = orderService.getOrder(oId);

        KakaoReadyResponse kakaoReadyResponse = paymentService.kakaoPayReady(order);
        return ResponseEntity.ok().body(kakaoReadyResponse);

        //return ResponseEntity.badRequest().body("user not match");
    }

    @GetMapping("/success/{oId}")
    public ModelAndView afterPayRequest(@RequestParam("pg_token") String pgToken, @PathVariable("oId") long oId) {
        OrderEntity order = orderService.getOrder(oId);
        ApprovePaymentEntity kakaoApprove = paymentService.approveResponse(order, pgToken);
        // 결제 성공 시 quantity 감소, sales 증가
        List<OrderDetailEntity> detail = order.getOrders();
        for (OrderDetailEntity od : detail) {
            int quantity = od.getProduct().getQuantity();
            int updateQuantity = quantity - od.getQuantity();
            od.getProduct().setQuantity(updateQuantity);
            int sales = od.getProduct().getSales();
            int updateSales = sales + od.getQuantity();
            od.getProduct().setSales(updateSales);
            // orderDetail이 경매일 경우, auction에 paId 등록하기
            if (od.getType() == 2) {
                od.getAuction().setPaId(kakaoApprove.getPaId());
            }
        }
        order.setPayment(kakaoApprove);
        orderRepository.save(order);
        order.setStatus("결제 완료");
        orderService.createOrder(order);
        ModelAndView mav = new ModelAndView("shopping/paymentSuccess");
        mav.addObject("kakaoApprove", kakaoApprove);
        return mav;
    }

    //TODO: 여기로 잘 오는지
    @GetMapping("/cancel")
    public String cancel() {
        System.out.println("결제 취소");
        return "shopping/paymentCancel";
    }

    //TODO: 여기로 잘 오는지
    @GetMapping("/fail")
    public String fail() {
        System.out.println("결제 실패");
        return "shopping/paymentFail";
    }

    @PostMapping("/refund/{paId}")
    public ResponseEntity<Object> refund(@PathVariable("paId") long paId) {
        ApprovePaymentEntity approve = paymentService.getApprovePayment(paId);
        System.out.println("PAID : " + paId);
        RefundPaymentEntity kakaoCancelResponse = paymentService.kakaoRefund(approve);
        // 결제 취소 시 quantity  증가, sales 감소
        OrderEntity order = orderService.getOrder(Long.parseLong(approve.getPartner_order_id()));
        List<OrderDetailEntity> detail = order.getOrders();
        for (OrderDetailEntity od : detail) {
            int quantity = od.getProduct().getQuantity();
            int updateQuantity = quantity + od.getQuantity();
            od.getProduct().setQuantity(updateQuantity);
            int sales = od.getProduct().getSales();
            int updateSales = sales - od.getQuantity();
            od.getProduct().setSales(updateSales);
        }
        order.setStatus("결제취소");
        orderRepository.save(order);
        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }
}
