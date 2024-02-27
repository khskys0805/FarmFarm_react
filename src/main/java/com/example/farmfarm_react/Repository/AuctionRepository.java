package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.AuctionEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuctionRepository extends CrudRepository<AuctionEntity, Integer> {
    public AuctionEntity findByauId(Long auId);
    public List<AuctionEntity> findAll();

    public List<AuctionEntity> findAllByUser(UserEntity user);

    public List<AuctionEntity> findAllByProductOrderByPriceDescQuantityDesc(ProductEntity product);

}
