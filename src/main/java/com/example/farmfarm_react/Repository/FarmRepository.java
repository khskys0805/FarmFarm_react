package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.List;

public interface FarmRepository extends CrudRepository<FarmEntity, Integer> {
    public FarmEntity findByfIdAndStatusLike(Long fId, String status);
    public FarmEntity findByUserAndStatusLike(UserEntity user, String status);
    public List<FarmEntity> findAllByStatusLike(Sort sort, String status);
    public List<FarmEntity> findAllByStatusLikeOrderByRatingDesc(String status);
    public List<FarmEntity> findAllByNameContainingAndStatusLike(@RequestParam("name") String keyword, String status);
    public List<FarmEntity> findAllByNameContainingAndStatusLike(@RequestParam("name") String keyword, Sort sort, String status);
    public List<FarmEntity> findAllByLocationCityAndLocationGu(String locationCity, String locationGu);
}
