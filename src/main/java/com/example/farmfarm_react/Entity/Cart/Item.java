package com.example.farmfarm_react.Entity.Cart;

import com.example.farmfarm_react.Entity.ProductEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Item {
    private long u_id;
    private long p_id;
    private int quantity;

    private ProductEntity product;
}