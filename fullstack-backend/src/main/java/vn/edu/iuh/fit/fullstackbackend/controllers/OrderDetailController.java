package vn.edu.iuh.fit.fullstackbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.fullstackbackend.models.Order;
import vn.edu.iuh.fit.fullstackbackend.models.OrderDetail;
import vn.edu.iuh.fit.fullstackbackend.repositories.OrderDetailRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderDetailController {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping("/orderdetails")
    List<OrderDetail> getAllUsers() {
        return orderDetailRepository.findAll();
    }
}
