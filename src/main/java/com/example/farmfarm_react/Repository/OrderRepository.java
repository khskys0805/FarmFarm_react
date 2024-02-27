package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.OrderEntity;;
import com.example.farmfarm_react.Entity.UserEntity;
import org.hibernate.criterion.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<OrderEntity, Long> {
    public OrderEntity findByoId(Long oId);
    public List<OrderEntity> findAllByUserAndTypeGreaterThan(UserEntity user, int type);
    public List<OrderEntity> findAllByUserAndTypeLessThan(UserEntity user, int type);
    public List<OrderEntity> findAllByStatusContains(String status);
}
