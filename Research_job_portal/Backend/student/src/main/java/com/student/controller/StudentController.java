package com.student.controller;

import com.student.entity.Student;
import com.student.repository.StudentRepository;
import com.student.service.StudentService;
//import com.user.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping; //Added this import

import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://20.171.65.218:3000", allowCredentials = "true")
@RequestMapping("/students") // Added a base path for student-related endpoints
public class StudentController {

    private final StudentService studentService; // Made studentService final
    @Autowired
    StudentRepository repo;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/getStudentDetailsByIds") // More specific path
    public List<Student> getStudentDetailsByIds(@RequestParam("studentIds") String studentIds) {
        List<String> studentIdList = Arrays.asList(studentIds.split(","));
        List<Long> longStudentIdList = studentIdList.stream()
                .map(Long::parseLong)
                .collect(Collectors.toList());
        return studentService.getStudentDetailsByIds(longStudentIdList);
    }
    
    @GetMapping("/getStudentById/{studentId}")
    public Student getStudentById(@PathVariable long studentId)
    {
    	return repo.findById(studentId).get();
    	
    	
    	
    }
    
    @GetMapping("/allUsers")
    public List<Student> allusers() {
        return repo.findAll();
    }

    // ... other student controller methods ...
}
