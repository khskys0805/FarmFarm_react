package com.example.farmfarm_react.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="order_detail")
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailEntity {
    @Id
    @GeneratedValue
    @Column(name="od_id")
    private long odId;

    private int quantity;

    private long price;

    //0 일반, 1 공동, 2 경매
    private int type;

    //배송 상태
    private String deliveryStatus;

    //송장번호
    private String trackingNum;

    @ManyToOne
    @JoinColumn(name="au_id")
    private AuctionEntity auction;

    @ManyToOne
    @JoinColumn(name="g_id")
    private GroupEntity group;

    @OneToOne
    @JoinColumn(name="p_id")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name="o_id")
    @JsonIgnore
    private OrderEntity order;

}
