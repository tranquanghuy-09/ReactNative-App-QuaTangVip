package vn.edu.iuh.fit.fullstackbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.fullstackbackend.models.User;
import vn.edu.iuh.fit.fullstackbackend.repositories.UserRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    User getUser(@RequestParam("user_id") long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    @GetMapping("/diem")
    Double getPointUser(@RequestParam("user_id") long userId) {
        return userRepository.getDiemByUserId(userId);
    }
}
