package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import com.example.farmfarm_react.Entity.kakaoPay.RefundPaymentEntity;
import org.springframework.data.repository.CrudRepository;

public interface RefundPaymentRepository extends CrudRepository<RefundPaymentEntity, Integer> {
}
