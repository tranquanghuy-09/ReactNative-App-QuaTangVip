package vn.edu.iuh.fit.fullstackbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.fullstackbackend.models.Product;
import vn.edu.iuh.fit.fullstackbackend.models.ProductPrice;
import vn.edu.iuh.fit.fullstackbackend.pks.ProductPricePK;

import java.util.List;
import java.util.Optional;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, ProductPricePK> {
    @Query("FROM ProductPrice WHERE product = :product ORDER BY priceDateTime desc limit 1")
    Optional<ProductPrice> findNewPrice(Product product);

    List<ProductPrice> findByProduct(Product product);
}