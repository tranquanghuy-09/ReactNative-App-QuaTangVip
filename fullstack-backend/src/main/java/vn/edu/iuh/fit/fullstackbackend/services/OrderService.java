package vn.edu.iuh.fit.fullstackbackend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.fullstackbackend.dto.OrderDto;
import vn.edu.iuh.fit.fullstackbackend.map.OrderDTOMap;
import vn.edu.iuh.fit.fullstackbackend.repositories.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDTOMap orderDTOMap;

    public OrderService(OrderRepository orderRepository, OrderDTOMap orderDTOMap) {
        this.orderRepository = orderRepository;
        this.orderDTOMap = orderDTOMap;
    }

    public Page<OrderDto> getAllOrderByUserId(long userId, Pageable pageable){
        Page<Object[]> allOrderByUserId = orderRepository.getAllOrderByUserId(userId, pageable);
        return orderDTOMap.toPage(allOrderByUserId);
    }
}
