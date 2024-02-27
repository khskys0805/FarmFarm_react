package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.AuctionEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    public AuctionEntity createAuction(UserEntity user, AuctionEntity auction, ProductEntity product) {
        if (product.isAuction()) {
            auction.setUser(user);
            auction.setProduct(product);
            return auctionRepository.save(auction);
        }
        return null;
    }

    //내 경매 참여 내역
    public List<AuctionEntity> myAuctionList(UserEntity user) {
        return auctionRepository.findAllByUser(user);
    }

    //상품별 경매 참여 내역
    public List<AuctionEntity> auctionList(ProductEntity product) {
        return auctionRepository.findAllByProductOrderByPriceDescQuantityDesc(product);
    }
}
