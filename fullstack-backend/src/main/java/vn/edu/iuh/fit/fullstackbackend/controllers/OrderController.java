package vn.edu.iuh.fit.fullstackbackend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.fullstackbackend.dto.OrderDetailDto;
import vn.edu.iuh.fit.fullstackbackend.dto.OrderDto;
import vn.edu.iuh.fit.fullstackbackend.dto.OrderRequestDto;
import vn.edu.iuh.fit.fullstackbackend.models.Order;
import vn.edu.iuh.fit.fullstackbackend.models.OrderDetail;
import vn.edu.iuh.fit.fullstackbackend.repositories.*;
import vn.edu.iuh.fit.fullstackbackend.services.OrderService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders2")
    List<Order> getAllOrders2() {
        return orderRepository.findAll();
    }

    @GetMapping("/orders")
    Page<OrderDto> getAllOrders(@RequestParam(name = "user_id", defaultValue = "1")long userId,
                               @RequestParam("page") Optional<Integer> page,
                               @RequestParam("size") Optional<Integer> size) {
        Pageable pageable = PageRequest.of(page.orElse(0), size.orElse(7));

        return orderService.getAllOrderByUserId(userId, pageable);
    }

    @PostMapping("/order")
    Order addOrder(@RequestBody OrderRequestDto orderRequestDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        LocalDateTime orderDate = orderRequestDto.getOrder_date() == null
                ? LocalDateTime.now()
                : LocalDateTime.parse(orderRequestDto.getOrder_date(), formatter);
        Order order = new Order(
                orderDate,
                orderRequestDto.getStatus() == 1 ? "Giao thành công" : "",
                employeeRepository.findById(orderRequestDto.getEmployee_id()).orElse(null),
                userRepository.findById(orderRequestDto.getUser_id()).orElse(null)
        );
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailDto orderDetailDto : orderRequestDto.getOrder_detail()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setQuantity(orderDetailDto.getQuantity());
            orderDetail.setPrice(orderDetailDto.getPrice());
            orderDetail.setNote(orderDetailDto.getNote().equals("")?null:orderDetailDto.getNote());

            orderDetail.setProduct(productRepository.findById(orderDetailDto.getProduct_id()).orElse(null));
            orderDetail.setOrder(order);
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);

        return orderRepository.save(order);
    }

}
