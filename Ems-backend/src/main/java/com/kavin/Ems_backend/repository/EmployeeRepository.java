package com.kavin.Ems_backend.repository;

import com.kavin.Ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
