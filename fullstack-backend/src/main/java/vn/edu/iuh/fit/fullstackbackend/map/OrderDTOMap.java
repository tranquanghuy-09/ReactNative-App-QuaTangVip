package vn.edu.iuh.fit.fullstackbackend.map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.fullstackbackend.dto.OrderDto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderDTOMap {
    public Page<OrderDto> toPage(Page<Object[]> objects) {
        if (objects == null) {
            return new PageImpl<>(new ArrayList<>());
        }

        List<OrderDto> articleDTOList = objects.stream().map(obj -> {
            try {
                return new OrderDto(
                        (Long) obj[0],
                        obj[1].toString(),
                        obj[2].toString(),
                        obj[3].toString(),
                        Math.round((Double) obj[4])
                );
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();
        return new PageImpl<>(articleDTOList);
    }
}
