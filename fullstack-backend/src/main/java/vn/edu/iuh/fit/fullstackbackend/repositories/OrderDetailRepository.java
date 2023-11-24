package vn.edu.iuh.fit.fullstackbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.fullstackbackend.models.OrderDetail;
import vn.edu.iuh.fit.fullstackbackend.pks.OrderDetailPK;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailPK> {
}