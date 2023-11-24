package vn.edu.iuh.fit.fullstackbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.fullstackbackend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}