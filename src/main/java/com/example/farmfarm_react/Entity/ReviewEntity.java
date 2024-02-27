package com.example.farmfarm_react.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.h2.engine.User;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@DynamicUpdate
@Table(name="review_table")
@Getter
@Setter
public class ReviewEntity {
    @Id
    @GeneratedValue
    @Column(name="rp_id")
    private long rpId;

    private double productStar;

    private double farmStar;

    private String comment;

    @ManyToOne
    @JoinColumn(name="user")
    private UserEntity user;

    @OneToOne
    @JoinColumn(name="order_detail")
    private OrderDetailEntity orderDetail;
}
