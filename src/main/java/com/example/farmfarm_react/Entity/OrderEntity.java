package com.example.farmfarm_react.Entity;

import com.example.farmfarm_react.Entity.kakaoPay.ApprovePaymentEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="order_table")
@NoArgsConstructor
@Getter
@Setter
public class OrderEntity {
    @Id
    @GeneratedValue
    @Column(name="o_id")
    private long oId;

    private long total_price;

    private int total_quantity;

    //결제에 대한 상태
    private String status;

    @Column(name="is_delivery")
    private boolean delivery;

    private String delivery_address;

    private String delivery_address_detail;

    private String delivery_name;

    private String delivery_phone;

    private String delivery_memo;

    @CreationTimestamp
    private Timestamp created_at;

    @OneToMany(mappedBy = "order")
    private List<OrderDetailEntity> orders = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="u_id")
    private UserEntity user;

    @OneToOne
    @JoinColumn(name="pa_id")
    private ApprovePaymentEntity payment;

    private int type; //0 일반, 1 공동, 2 경매
}
