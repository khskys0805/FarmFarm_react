package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.RegionDataEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<RegionDataEntity, Long> {
    @Query("SELECT DISTINCT r.sido FROM RegionDataEntity r")
    public List<String> findDistinctSido();
    @Query("SELECT DISTINCT r.gugun FROM RegionDataEntity r WHERE r.sido = :sido")
    public List<String> findDistinctGugunBySido(String sido);
}
