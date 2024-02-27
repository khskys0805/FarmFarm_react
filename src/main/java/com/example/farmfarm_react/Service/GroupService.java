package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.GroupEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    public GroupEntity createGroup(UserEntity user, ProductEntity product) {
        if (product.isGroup()) {
            GroupEntity group = new GroupEntity();
            group.setProduct(product);
            group.setUser1(user);
            group.setCapacity(1);
            group.setIsClose(0);
            return groupRepository.save(group);
        }
        return null; //TODO:나중에 에러 처리 해야할듯
    }

    public GroupEntity getGroup(long gId) {
        return groupRepository.findBygId(gId);
    }

    public GroupEntity attendGroup(long gId, UserEntity user) {
        GroupEntity group = getGroup(gId);
        group.setUser2(user);
        group.setCapacity(0);
        return groupRepository.save(group);
    }

    public List<GroupEntity> findByProduct(ProductEntity product) {
        return groupRepository.findAllByProduct(product);
    }


}
