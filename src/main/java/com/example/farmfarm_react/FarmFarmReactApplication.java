package com.example.farmfarm_react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class FarmFarmReactApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmFarmReactApplication.class, args);
    }

}
