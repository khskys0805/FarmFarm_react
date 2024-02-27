package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import org.springframework.data.repository.CrudRepository;

public interface ApprovePaymentRepository extends CrudRepository<ApprovePaymentEntity, Integer> {
    public ApprovePaymentEntity findBypaId(long paId);
}
