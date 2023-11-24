package vn.edu.iuh.fit.fullstackbackend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.fullstackbackend.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}