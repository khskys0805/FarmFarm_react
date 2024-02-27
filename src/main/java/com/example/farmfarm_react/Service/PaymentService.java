package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.OrderEntity;
import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import com.example.farmfarm_react.Entity.kakaoPay.KakaoReadyResponse;
import com.example.farmfarm_react.Entity.kakaoPay.RefundPaymentEntity;
import com.example.farmfarm_react.Repository.ApprovePaymentRepository;
import com.example.farmfarm_react.Repository.RefundPaymentRepository;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentService {
    @Autowired
    ApprovePaymentRepository approvePaymentRepository;
    @Autowired
    RefundPaymentRepository refundPaymentRepository;
    private String cid = "TC0ONETIME";

    @Value("${kakaoAdminKey}")
    private String adminKey;

    @Value("${serverUrl}")
    private String serverUrl;

    private KakaoReadyResponse response;

    public KakaoReadyResponse kakaoPayReady(OrderEntity order) {

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", String.valueOf(order.getOId()));
        parameters.add("partner_user_id", String.valueOf(order.getUser().getUId()));
        if (order.getOrders().size() > 1) {
            parameters.add("item_name", order.getOrders().get(0).getProduct().getName() + " 외 " + (order.getOrders().size() - 1) + "건");
        } else {
            parameters.add("item_name", order.getOrders().get(0).getProduct().getName());
        }
        parameters.add("quantity", String.valueOf(order.getTotal_quantity()));
        parameters.add("total_amount", String.valueOf(order.getTotal_price()));
        parameters.add("vat_amount", String.valueOf(Math.round(order.getTotal_price() * 0.1)));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", serverUrl + "/pay/success/" + String.valueOf(order.getOId())); // 성공 시 redirect url
        parameters.add("cancel_url",  serverUrl + "/pay/cancel"); // 취소 시 redirect url
        parameters.add("fail_url",  serverUrl + "/pay/fail"); // 실패 시 redirect url
        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        response = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);
        return response;
    }

    /**
     * 카카오 요구 헤더값
     */
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + adminKey;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }

    public ApprovePaymentEntity approveResponse(OrderEntity order, String pgToken) {

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", response.getTid());
        parameters.add("partner_order_id", String.valueOf(order.getOId()));
        parameters.add("partner_user_id", String.valueOf(order.getUser().getUId()));
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        ApprovePaymentEntity approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                ApprovePaymentEntity.class);

        return approvePaymentRepository.save(approveResponse);
    }

    public RefundPaymentEntity kakaoRefund(ApprovePaymentEntity order) {

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", order.getTid());
        parameters.add("cancel_amount", String.valueOf(order.getAmount().getTotal()));
        parameters.add("cancel_tax_free_amount", String.valueOf(order.getAmount().getTax_free()));
//        parameters.add("cancel_vat_amount", "0");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        RefundPaymentEntity refundResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                RefundPaymentEntity.class);

        return refundPaymentRepository.save(refundResponse);
    }

    public ApprovePaymentEntity getApprovePayment(long paId) {
        return approvePaymentRepository.findBypaId(paId);
    }

}