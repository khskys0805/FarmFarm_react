package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<ReviewEntity, Long> {
    public ReviewEntity findByRpId(long rpId);
    public List<ReviewEntity> findAll();
    public List<ReviewEntity> findByUser(UserEntity user);
}
