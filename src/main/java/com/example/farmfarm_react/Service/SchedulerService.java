package com.example.farmfarm_react.Service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.farmfarm_react.Controller.PaymentController;
import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Repository.*;
//import org.apache.jasper.compiler.JspUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class SchedulerService {

    @Autowired
    private ProductService productService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private PaymentController paymentController;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    //@Scheduled(cron = "0 0 * * * *")
//    public void openAuction() throws ParseException {
//        List<ProductEntity> products = productService.getAllAuctionProduct();
//        Calendar current = Calendar.getInstance();
//        for (ProductEntity product : products) {
//            String date = product.getOpenCalendar();
//            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Calendar open = Calendar.getInstance();
//            open.setTime(format.parse(date));
//            if (current.after(open)) {
//                product.setOpen_status(1);
//            }
//        }
//    }

    @Scheduled(cron = "0 * * * * *")
    public void closeAuction() throws ParseException {
        List<ProductEntity> products = productService.getAllAuctionProduct();
        Calendar current = Calendar.getInstance();
        for (ProductEntity product : products) {
            String date = product.getCloseCalendar();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            Calendar close = Calendar.getInstance();
            close.setTime(format.parse(date));
            if (current.after(close)) {
                product.setOpen_status(2);
                productRepository.save(product);
            }
        }
    }

    @Scheduled(cron = "0 * * * * *")
    public void selectTopAuction() throws ParseException {
        List<ProductEntity> products = productService.getAllAuctionProduct();
        for (ProductEntity product : products) {
            if (product.getOpen_status() == 2) {
                List<AuctionEntity> auctions = auctionService.auctionList(product); // 제시 가격이 비싼 순 -> 수량이 많은 순으로 정렬
                int auctionQ = product.getAuction_quantity();
                for (AuctionEntity auction : auctions) {
                    if (auction.getStatus().equals("경매 진행중")) {
                        if (product.getLow_price() == 0) {  // 낙찰이 아직 되지 않았을 경우 계속 탐색 (예시로 든 변수명임. 바꿀 필요 있음!)
                            auction.setStatus("경매 낙찰 성공"); // 해당 경매건을 채택
                            auctionQ -= auction.getQuantity();
                            product.setAuction_quantity(auctionQ); // 상품의 경매 수량을 조정
                            product.setLow_price(1);
                            productRepository.save(product);
                            auctionRepository.save(auction);
                            System.out.println(auction.getPaId() + " 경매 성공!!!!!");
                        }
                        else {  // 낙찰이 되었을 경우 경매 기각
                            System.out.println(auction.getPaId() + " 여기로 들어오긴 하니,,?");
                            auctionQ = -1;
                            auction.setStatus("경매 낙찰 실패"); // 해당 경매건을 기각
                            auctionRepository.save(auction);
                            paymentController.refund(auction.getPaId()); // 결제 취소 처리 후 그 다음 경매건을 탐색
                        }
                    }
                }
            }
        }
    }
    @Scheduled(cron = "0 * * * * *")
    public void closeGroup(){
        List<GroupEntity> groups = groupRepository.findAllByIsClose(0);
        Date currentTime = new Date();
        for (GroupEntity group : groups) {
            if (group.getClosed_at() != null && group.getClosed_at().before(currentTime)) {
                group.setIsClose(1);
                groupRepository.save(group);
            }
        }
    }

    @Scheduled(cron = "0 * * * * *")
    public void closeNoPaidOrder() {
        List<OrderEntity> orders = orderRepository.findAllByStatusContains("결제전");
        for (OrderEntity order : orders) {
            List<OrderDetailEntity> orderDetails = orderDetailRepository.findAllByOrder_oId(order.getOId());
            for (OrderDetailEntity od : orderDetails) {
                System.out.println("od 지워지는중~ " + od.getOdId());
                orderDetailRepository.delete(od);
            }
            System.out.println("order 지워지는중~" + order.getOId());
            orderRepository.delete(order);
        }
    }
}
