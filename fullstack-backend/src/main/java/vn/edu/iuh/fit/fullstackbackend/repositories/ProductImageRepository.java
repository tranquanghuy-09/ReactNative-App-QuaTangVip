package vn.edu.iuh.fit.fullstackbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.fullstackbackend.models.Product;
import vn.edu.iuh.fit.fullstackbackend.models.ProductImage;

import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    @Query("FROM ProductImage WHERE product = :product ORDER BY product.productId asc limit 1")
    Optional<ProductImage> findOneImage(Product product);

}