package vn.edu.iuh.fit.fullstackbackend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.fullstackbackend.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT o.order_id, e.name_store, o.order_status, o.order_date, SUM(od.price * od.quantity) * 0.01 AS DiemTichLuy\n" +
            "FROM orders o\n" +
            "INNER JOIN user u ON o.user_id = u.user_id\n" +
            "INNER JOIN order_detail od ON o.order_id = od.order_id\n" +
            "INNER JOIN employee e ON o.employee_id = e.emp_id\n" +
            "WHERE u.user_id = :userId \n" +
            "GROUP BY o.order_id, e.name_store, o.order_status, o.order_date\n" +
            "ORDER BY o.order_date DESC;", nativeQuery = true)
    Page<Object[]> getAllOrderByUserId(@Param("userId") long userId, Pageable pageable);

}