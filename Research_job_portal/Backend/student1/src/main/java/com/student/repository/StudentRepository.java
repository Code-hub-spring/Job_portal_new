package com.student.repository;

//In your StudentRepository
import com.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
 // Inherits findAllById()
}