package vn.edu.iuh.fit.fullstackbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private String note;
    private double price;
    private long product_id;
    private double quantity;
}
