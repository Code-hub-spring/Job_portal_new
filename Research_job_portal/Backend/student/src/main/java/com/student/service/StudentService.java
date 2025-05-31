package com.student.service;

//In your StudentService
import com.student.entity.Student;
import com.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

 @Autowired
 private StudentRepository studentRepository;

 public List<Student> getStudentDetailsByIds(List<Long> studentIds) {
     return studentRepository.findAllById(studentIds);
 }

 // ... other student service methods ...
}