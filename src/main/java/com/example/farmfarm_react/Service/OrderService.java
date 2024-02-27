package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.OrderEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.OrderRepository;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public OrderEntity createOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    public OrderEntity getOrder(long oId) {
        return orderRepository.findByoId(oId);
    }

    public List<OrderEntity> getMyOrderList(UserEntity user) {
        return orderRepository.findAllByUserAndTypeLessThan(user, 2);
    }
    public List<OrderEntity> getMyAuctionList(UserEntity user) {
        return orderRepository.findAllByUserAndTypeGreaterThan(user, 1);
    }
}
