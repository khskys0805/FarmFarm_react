package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Entity.Cart.Cart;
import com.example.farmfarm_react.Entity.Cart.Item;
import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import com.example.farmfarm_react.Repository.GroupRepository;
import com.example.farmfarm_react.Repository.OrderDetailRepository;
import com.example.farmfarm_react.Service.*;
import org.h2.engine.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private PaymentController paymentController;
    @Autowired
    private GroupRepository groupRepository;

    //장바구니에서 주문하기 누르면 오더디테일 객체 세션 저장
    @GetMapping("/cart")
    public ModelAndView saveOrderDetailCart(HttpSession session) {
        ModelAndView mav = new ModelAndView("home/product/productShippingAddress");
        List<OrderDetailEntity> details = new ArrayList<>();
        Cart cart = (Cart)session.getAttribute("cart");
        int isDirect = 0; // 0 : 배송, 1 : 직거래만
        for (Item i : cart.getItemList()) {
            OrderDetailEntity orderDetail = new OrderDetailEntity();
            orderDetail.setQuantity(i.getQuantity());
            ProductEntity product = productService.getProduct(i.getP_id());
            if (product.isDirect() == true) {   // 직거래만
                isDirect = 1;
            }
            orderDetail.setPrice(product.getPrice() * i.getQuantity());
            if (product.isGroup()) {
                orderDetail.setType(1);
            } else if (product.isAuction()) {
                orderDetail.setType(2);
            } else {
                orderDetail.setType(0);
            }
            orderDetail.setProduct(product);
            details.add(orderDetail);
            mav.addObject("isDirect", isDirect);
        }
        session.setAttribute("orderDetail", details);
        return mav;
    }

    //order 생성! - 이후 결제 진행
    @PostMapping("")
    public ResponseEntity<Object> createOrder(@RequestHeader("uid") String headerUId, HttpSession session, HttpServletRequest request, @RequestBody OrderEntity order) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        if (user == null) {
            long huid = Long.parseLong(headerUId);
            user = userService.findByUId(huid);
            System.out.println("로그인 풀림ㅋ");
            System.out.println(user);
            session.setAttribute("user", user);
        }
        List<OrderDetailEntity> details = (List<OrderDetailEntity>)session.getAttribute("orderDetail");
        System.out.println("오더디테일 값은?!!!!" + details);
        order.setUser(user);
        int totalP = 0;
        int totalQ = 0;
        for (OrderDetailEntity d : details) {
            totalP += d.getPrice();
            totalQ += d.getQuantity();
        }
        if (order.isDelivery() == true) {
            totalP += 3000;
        }
        order.setType(details.get(0).getType());
        order.setTotal_price(totalP);
        order.setTotal_quantity(totalQ);
        order.setStatus("결제전");
        OrderEntity saveOrder = orderService.createOrder(order);
        OrderEntity getOrder = orderService.getOrder(saveOrder.getOId());
        for (OrderDetailEntity d : details) {
            d.setOrder(getOrder);
            orderDetailService.createOrderDetail(d);
        }
        System.out.println("주문 정보 : " + getOrder.toString());
        session.setAttribute("cart", null);
        return ResponseEntity.ok().body(getOrder);

    }

    //TODO:공동 구매<단일>
    @GetMapping("/group/{gId}")
    public ModelAndView saveOrderDetailGroup(HttpSession session, HttpServletRequest request, @PathVariable("gId") long gId) {
        ModelAndView mav = new ModelAndView("home/product/productShippingAddress");
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        List<OrderDetailEntity> details = new ArrayList<>();
        OrderDetailEntity orderDetail = new OrderDetailEntity();
        UserEntity user = (UserEntity)session.getAttribute("user");
        GroupEntity group = groupService.attendGroup(gId, user);
        orderDetail.setGroup(group);
        orderDetail.setProduct(group.getProduct());
        orderDetail.setType(1);
        orderDetail.setQuantity(quantity);
        orderDetail.setPrice((long)((long)group.getProduct().getPrice() * 0.9));
        details.add(orderDetail);
        System.out.println(details);
        session.setAttribute("orderDetail", details);
        int isDirect = 0;
        if (group.getProduct().isDirect() == true) {   // 직거래만
            isDirect = 1;
        }
        mav.addObject("isDirect", isDirect);
        return mav;
    }

    @GetMapping("/product/{pId}/group")
    public ModelAndView createGroup(HttpServletRequest request, @PathVariable("pId") long pId, HttpSession session, @RequestParam int quantity) {
        ModelAndView mav = new ModelAndView("home/product/productShippingAddress");
        List<OrderDetailEntity> details = new ArrayList<>();
        UserEntity user = (UserEntity)session.getAttribute("user");
        ProductEntity product = productService.getProduct(pId);
        System.out.println("productId:" + product.getPId());
        int isDirect = 0;
        if (product.isDirect() == true) {   // 직거래만
            isDirect = 1;
        }
        GroupEntity group = groupService.createGroup(user, product);
        // created_at 컬럼에 저장된 시간을 가져옵니다.
        Timestamp createdAt = group.getCreated_at();
        // 24시간을 추가하여 closed_at 컬럼에 설정합니다.
        long twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24시간을 밀리초로 표현
        Timestamp closedAt = new Timestamp(createdAt.getTime() + twentyFourHoursInMillis);
        group.setClosed_at(closedAt);
        groupRepository.save(group);
        OrderDetailEntity orderDetail = new OrderDetailEntity();
        orderDetail.setGroup(group);
        orderDetail.setProduct(group.getProduct());
        orderDetail.setType(1);
        orderDetail.setQuantity(quantity);
        orderDetail.setPrice((long)((long)group.getProduct().getPrice() * 0.9));
        details.add(orderDetail);
        session.setAttribute("orderDetail", details);
        mav.addObject("isDirect", isDirect);
        return mav;
    }

    //TODO:경매 구매<단일> GET으로 바꾸기 requestparam 이용
    @GetMapping("/product/{pId}")
    public ModelAndView saveOrderDetailAuction(HttpSession session, @PathVariable("pId") long pId, @RequestParam("quantity") int quantity, @RequestParam("price") int price) {
        ModelAndView mav = new ModelAndView("home/product/productShippingAddress");
        ProductEntity product = productService.getProduct(pId);
        UserEntity user = (UserEntity)session.getAttribute("user");
        int isDirect = 0; // 0 : 배송, 1 : 직거래만
        if (product.isAuction()) {
            if (product.isDirect() == true) {   // 직거래만
                isDirect = 1;
            }
            AuctionEntity auction = new AuctionEntity();
            auction.setPrice(price);
            auction.setQuantity(quantity);
            auction.setStatus("경매 진행중");
            List<OrderDetailEntity> details = new ArrayList<>();
            OrderDetailEntity orderDetail = new OrderDetailEntity();
            AuctionEntity newAuction = auctionService.createAuction(user, auction, product);
            orderDetail.setAuction(newAuction);
            orderDetail.setProduct(product);
            orderDetail.setType(2);
            orderDetail.setQuantity(auction.getQuantity());
            orderDetail.setPrice((long) auction.getPrice() * auction.getQuantity());
            details.add(orderDetail);
            session.setAttribute("orderDetail", details);
            mav.addObject("isDirect", isDirect);
            return mav;
        }
        return null; //TODO: 에러페이지로 반드시 바꿀것
    }

    @GetMapping("")
    public ResponseEntity<Object> myOrderList(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
//        }

        List<OrderEntity> orderList = orderService.getMyOrderList(user);
        return ResponseEntity.ok().body(orderList);
    }


    @GetMapping("/auction")
    public ResponseEntity<Object> myAuctionList(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

        List<OrderEntity> auctionList = orderService.getMyAuctionList(user);
        return ResponseEntity.ok().body(auctionList);
    }


    //24시간 후 닫히는 메소드
    @ResponseBody
    @DeleteMapping("/group/{gId}")
    public String closeGroup(HttpSession session, HttpServletRequest request, @PathVariable("gId") long gId, Model model) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        GroupEntity group = groupService.getGroup(gId);
        System.out.println("GID : " + group.getGId());
        List<OrderDetailEntity> orderdetails = group.getOrderDetails();
        ProductEntity product = group.getProduct();
        System.out.println(orderdetails);
        OrderEntity order = orderdetails.get(0).getOrder();
        System.out.println("OID : " + order.getOId());
        ApprovePaymentEntity approvePayment = order.getPayment();
        System.out.println("APID : " + approvePayment.getPaId());
        ResponseEntity response = paymentController.refund(approvePayment.getPaId());
        for (OrderDetailEntity od : orderdetails) {
            //OrderDetailRepository.delete(od);
        }
        if (response.getStatusCode() == HttpStatus.OK) {
            return "redirect:/product/"+product.getPId();
        }
        return "redirect:/index";
    }

    @ResponseBody
    @GetMapping("/auction/cancel/{oId}")
    public void cancelJoinedAuction(@PathVariable("oId") long oId) {
        System.out.println("ORDER ID : " + oId);
        Long paId = orderService.getOrder(oId).getOrders().get(0).getAuction().getPaId();
        paymentController.refund(paId);
        System.out.println("취소 성공");
        orderService.getOrder(oId).setStatus("결제 취소");
        orderService.getOrder(oId).getOrders().get(0).getAuction().setStatus("경매 취소");
        orderService.createOrder(orderService.getOrder(oId));
    }

}