package vn.edu.iuh.fit.fullstackbackend.pks;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter @Getter
public class ProductPricePK implements Serializable {
    private Long product;
    private LocalDateTime priceDateTime;
}
