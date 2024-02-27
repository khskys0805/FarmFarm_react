package com.example.farmfarm_react.Entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;


@Data
@Entity
@NoArgsConstructor
@DynamicUpdate
@Table(name="farm")
@Getter
@Setter
public class FarmEntity {
    @Id
    @GeneratedValue
    @Column(name="f_id")
    private Long fId;
    private String name;
    private String locationCity;
    private String locationGu;
    private String locationFull;
    private String locationDetail;
    private String detail;
    private Double rating;
    private String image;
    private int auction_time;
    @Column(name="is_auction")
    private boolean auction;
    @CreationTimestamp
    private Timestamp created_at;

    @OneToOne
    @JoinColumn(name="user")
    private UserEntity user;


    private String status;

    @Builder
    public FarmEntity(Long fId, String name, String locationCity, String locationGu, String locationFull, String location_detail, String detail, Double rating, String image, int auction_time, boolean auction, Timestamp created_at) {
        this.fId = fId;
        this.name = name;
        this.locationCity = locationCity;
        this.locationGu = locationGu;
        this.locationFull = locationFull;
        this.locationDetail = location_detail;
        this.detail = detail;
        this.rating = rating;
        this.image = image;
        this.auction_time = auction_time;
        this.auction = auction;
        this.created_at = created_at;
    }

    public FarmEntity(FarmEntity farmEntity) {
    }
}


