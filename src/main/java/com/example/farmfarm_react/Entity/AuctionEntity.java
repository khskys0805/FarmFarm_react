package com.example.farmfarm_react.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@DynamicUpdate
@Table(name="auction")
@Getter
@Setter
public class AuctionEntity {
    @Id
    @GeneratedValue
    @Column(name="au_id")
    private long auId;

    private int quantity;

    private int price;

    private String status;

    private Long paId;

    @ManyToOne
    @JoinColumn(name="product")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name="user")
    private UserEntity user;
}
