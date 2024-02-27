package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.OrderDetailEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailRepository extends CrudRepository<OrderDetailEntity, Long> {
    public OrderDetailEntity findByodId(long odId);
    public List<OrderDetailEntity> findAllByProduct(ProductEntity product);
    public List<OrderDetailEntity> findAllByOrder_oId(long oid);
}
