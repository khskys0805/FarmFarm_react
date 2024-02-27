package com.example.farmfarm_react.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="user")
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue
    @Column(name="u_id")
    private Long uId;

    //카카오에서 주는 id
    private Long id;

    private String nickname;

    private String email;

    @CreationTimestamp
    private Timestamp create_time;

    private String user_role;

    //혹시나 일반 로그인이나 naver 로그인 등 다른 로그인 수단 도입시 필요
    private String platform;

    private String status;

    private String image;

    @Builder
    public UserEntity(Long id, String nickname, String email, String user_role, String platform, String status, String image) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.user_role = user_role;
        this.platform = platform;
        this.image = image;
        this.status = status;
    }
}
