package vn.edu.iuh.fit.fullstackbackend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import vn.edu.iuh.fit.fullstackbackend.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select sum(t.DiemTichLuy) as Diem from\n" +
            "(SELECT o.order_id, u.user_id, o.order_status, o.order_date, SUM(od.price * od.quantity) * 0.01 AS DiemTichLuy\n" +
            "FROM orders o\n" +
            "INNER JOIN user u ON o.user_id = u.user_id\n" +
            "INNER JOIN order_detail od ON o.order_id = od.order_id\n" +
            "WHERE u.user_id = :userId \n" +
            "GROUP BY o.order_id, o.order_status, o.order_date\n" +
            "ORDER BY o.order_date DESC) t\n" +
            "group by t.user_id", nativeQuery = true)
    Double getDiemByUserId(@RequestParam("user_id") long userId);
}
