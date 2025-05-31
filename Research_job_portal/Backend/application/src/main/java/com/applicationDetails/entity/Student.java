package com.applicationDetails.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "student") // Optional: Specify the table name if it's not "student"
public class Student {

    @Id
    @Column(name = "student_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "skill_set")
    private String skillSet;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "experience")
    private String experience;

    @Column(name = "email_id", unique = true, nullable = false)
    private String emailId;

    // Constructors

    public Student() {
    }

    public Student(String studentName, String skillSet, String qualification, String experience, String emailId) {
        this.studentName = studentName;
        this.skillSet = skillSet;
        this.qualification = qualification;
        this.experience = experience;
        this.emailId = emailId;
    }

    // Getters and Setters

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getSkillSet() {
        return skillSet;
    }

    public String setSkillSet() {
    	 return skillSet;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    // toString()

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", studentName='" + studentName + '\'' +
                ", skillSet=" + skillSet +
                ", qualification='" + qualification + '\'' +
                ", experience='" + experience + '\'' +
                ", emailId='" + emailId + '\'' +
                '}';
    }
}

