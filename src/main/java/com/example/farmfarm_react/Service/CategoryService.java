package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.RegionDataEntity;
import com.example.farmfarm_react.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;



    public List<String> getDistinctSidoValues() {
        return categoryRepository.findDistinctSido();
    }

    public List<String> getDistinctGugunValuesBySido(String sido) {
        System.out.println("sido" + sido);
        List<String> list = categoryRepository.findDistinctGugunBySido(sido);
        for (String s : list) {
            System.out.println("gugun : " + s);
        }
        return list;
    }
}
