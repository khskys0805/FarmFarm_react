package com.example.farmfarm_react.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
@Data
@NoArgsConstructor
@DynamicUpdate
@Table(name = "region_data")
@Entity
@Getter
@Setter
public class RegionDataEntity {
    @Id
    @GeneratedValue
    @Column(name="r_id")
    private int idx;
    private String sido;
    private String gugun;
}
