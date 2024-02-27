package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {
    public UserEntity findByEmail(String email);
    public UserEntity findById(Long id);
    public UserEntity findByuId(Long uId);
}
