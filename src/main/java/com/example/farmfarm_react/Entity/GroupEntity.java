package com.example.farmfarm_react.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@DynamicUpdate
@Table(name="group_table")
@Getter
@Setter
public class GroupEntity {
    @Id
    @GeneratedValue
    @Column(name="g_id")
    private Long gId;

    private int capacity;

    @CreationTimestamp
    private Timestamp created_at;

    private Timestamp closed_at;

    @ManyToOne
    @JoinColumn(name="product")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name="user_1")
    private UserEntity user1;

    @ManyToOne
    @JoinColumn(name="user_2")
    private UserEntity user2;

    @JsonIgnore
    @OneToMany(mappedBy = "group")
    private List<OrderDetailEntity> orderDetails = new ArrayList<>();

    private int isClose;

}
