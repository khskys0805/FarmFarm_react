package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.EnquiryEntity;
import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EnquiryRepository extends CrudRepository<EnquiryEntity, Long> {
    public EnquiryEntity findByeId(long eId);
    public List<EnquiryEntity> findByProduct(ProductEntity product);
    public List<EnquiryEntity> findByUser(UserEntity user);
}
