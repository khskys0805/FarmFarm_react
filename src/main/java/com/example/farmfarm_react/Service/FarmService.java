package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Service
public class FarmService {
    @Autowired
    private FarmRepository farmRepository;
    @Autowired
    private UserService userService;

    // 농장 등록
    public FarmEntity saveFarm(UserEntity user, FarmEntity farm) {
        farm.setUser(user);
        farm.setStatus("yes");
        return farmRepository.save(farm);
    }

    //농장 전체 조회 및 정렬 (rating: 인기순 , old: 오래된 순, new: 신규순), Default: rating
    public List<FarmEntity> getFarmsOrderBy(String criteria) {
        switch (criteria) {
            case "old":
                return farmRepository.findAllByStatusLike(Sort.by(Sort.Direction.ASC, "fId"), "yes");
            case "new":
                return farmRepository.findAllByStatusLike(Sort.by(Sort.Direction.DESC, "fId"), "yes");
            default:
                return farmRepository.findAllByStatusLike(Sort.by(Sort.Direction.DESC, "rating"), "yes");
        }
    }

    //농장 검색
    public List<FarmEntity> searchFarms(String keyword) {
        return farmRepository.findAllByNameContainingAndStatusLike(keyword, "yes");
    }

    //농장 검색, 농장 정렬 같이
    public List<FarmEntity> searchSortFarms(String keyword, String criteria) {
        switch (criteria) {
            case "old":
                return farmRepository.findAllByNameContainingAndStatusLike(keyword, Sort.by(Sort.Direction.ASC, "fId"), "yes");
            case "new":
                return farmRepository.findAllByNameContainingAndStatusLike(keyword, Sort.by(Sort.Direction.DESC, "fId"), "yes");
            default:
                return farmRepository.findAllByNameContainingAndStatusLike(keyword, Sort.by(Sort.Direction.DESC, "rating"), "yes");
        }
    }


    public List<FarmEntity> searchByLocation(String locationCity, String locationGu) {
        return farmRepository.findAllByLocationCityAndLocationGu(locationCity, locationGu);
    }

    // 농장 상세 조회
    public FarmEntity getFarm(Long fId) {
        FarmEntity fa = farmRepository.findByfIdAndStatusLike(fId, "yes");
        if (fa.getStatus().equals("no"))
            return null;
        return fa;
    }

    //나의 농장 조회
    public FarmEntity getMyFarm(UserEntity user) {
        FarmEntity myFarm = farmRepository.findByUserAndStatusLike(user, "yes");
        if (myFarm != null) {
            System.out.println(myFarm.getStatus());
        }
        return myFarm;
    }

    // 농장 수정
    public FarmEntity updateFarm(HttpServletRequest request, Long fId, FarmEntity farm) {
        UserEntity user = userService.getUser(request);
        FarmEntity newFarm = farmRepository.findByfIdAndStatusLike(fId, "yes");

        if (Objects.equals(user.getUId(), newFarm.getUser().getUId())) {
            // 수정되는 것들  (농장 이름, 위치-시, 위치-구, 상세, 이미지, 경매시간, 경매 참여 여부, 생성 시간?)
            newFarm.setName(farm.getName());
            newFarm.setLocationCity(farm.getLocationCity());
            newFarm.setLocationGu(farm.getLocationGu());
            newFarm.setLocationFull(farm.getLocationFull());
            newFarm.setLocationDetail(farm.getLocationDetail());
            newFarm.setDetail(farm.getDetail());
            newFarm.setImage(farm.getImage());
            newFarm.setAuction_time(farm.getAuction_time());
            newFarm.setAuction(farm.isAuction()); // 이게 왜 이런걸까요 ?
            newFarm.setCreated_at(farm.getCreated_at());
            newFarm.setDetail(farm.getDetail());
            farmRepository.save(newFarm);
            return newFarm;
        } else {
            return null;
        }
    }

    // 농장 삭제
    public void deleteFarm(HttpSession session, Long fId) throws Exception {
        UserEntity user = (UserEntity) session.getAttribute("user");
        FarmEntity farm = farmRepository.findByfIdAndStatusLike(fId, "yes");
        if (Objects.equals(user.getUId(), farm.getUser().getUId())) {
            farm.setStatus("no");
            farmRepository.save(farm);
        } else {
            System.out.println("유저가 다름!!!!");
            throw new Exception();
        }
    }
}
