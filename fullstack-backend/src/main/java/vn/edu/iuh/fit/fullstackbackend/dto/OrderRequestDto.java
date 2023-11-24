package vn.edu.iuh.fit.fullstackbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
    private long employee_id;
    private String order_date;
    private List<OrderDetailDto> order_detail;
    private int status;
    private long user_id;
}
