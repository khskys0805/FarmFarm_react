package com.example.farmfarm_react.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@DynamicUpdate
@Table(name="product")
@Getter
@Setter
public class ProductEntity {
    @Id
    @GeneratedValue
    @Column(name = "p_id")
    private Long pId;

    private String name;

    private Double rating; // 상품 별점

    private int sales; // 주문량

    private String detail;

    private String image1;

    private String image2;

    private String image3;

    @Column(name="is_group")
    private boolean group;  // 변경 불가 - 공구 여부

    @CreationTimestamp
    private Timestamp created_at;

    private Date date;

    private int hour;

    private int minute;

    private String closeCalendar;

    private int quantity;

    private int auction_quantity;

    private int price;

    @Column(name="is_direct")
    private boolean direct;  // 변경 불가 - 직거래 여부

    private String direct_location;  // 직거래 장소

    private int low_price;  // 경매 최저가

    @Column(name="is_auction")
    private boolean auction;  // 변경 불가 - 경매 여부

    private int open_status; //0이면 아직 안열림, 1이면 열려있음, 2이면 열렸다가 닫힘 -> 처음값은 무조건 0

    private int type;

    @ManyToOne
    @JoinColumn(name="farm")
    private FarmEntity farm;

    @OneToOne
    @JoinColumn(name="product_category_c_id")
    private ProductCategoryEntity productCategory;

    private String status;

}
