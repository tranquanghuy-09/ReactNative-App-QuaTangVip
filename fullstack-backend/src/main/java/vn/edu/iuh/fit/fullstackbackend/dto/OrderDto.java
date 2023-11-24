package vn.edu.iuh.fit.fullstackbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private long id;
    private String storeName;
    private String status;
    private String orderDate;
    private double diemTichLuy;
}
