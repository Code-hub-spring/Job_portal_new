package com.applicationDetails.entity;

//Application Service - Entity: ApplicationDetails


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class ApplicationDetails {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String jobId;
 private String studentId; // Static student ID
 private String jobStatus; // e.g., "Active", "Closed" (related to the job posting itself)
 private String hiringStatus; // e.g., "Applied", "Reviewed", "Interviewing", "Offered", "Rejected", "Hired"
 private LocalDateTime applyDate;
 private LocalDateTime hiringDate;
 private LocalDateTime rejectionDate;
 private String jobTitle;

 public String getJobTitle() {
	return jobTitle;
}

 public void setJobTitle(String jobTitle) {
	this.jobTitle = jobTitle;
 }

 // Default Constructor
 public ApplicationDetails() {
     this.applyDate = LocalDateTime.now();
     this.hiringStatus = "Applied"; // Initial status upon application
 }

 // Constructor with jobId and studentId
 public ApplicationDetails(String jobId, String studentId) {
     this.jobId = jobId;
     this.studentId = studentId;
     this.applyDate = LocalDateTime.now();
     this.hiringStatus = "Applied";
 }

 // Getters and Setters
 public Long getId() {
     return id;
 }

 public void setId(Long id) {
     this.id = id;
 }

 public String getJobId() {
     return jobId;
 }

 public void setJobId(String jobId) {
     this.jobId = jobId;
 }

 public String getStudentId() {
     return studentId;
 }

 public void setStudentId(String studentId) {
     this.studentId = studentId;
 }

 public String getJobStatus() {
     return jobStatus;
 }

 public void setJobStatus(String jobStatus) {
     this.jobStatus = jobStatus;
 }

 public String getHiringStatus() {
     return hiringStatus;
 }

 public void setHiringStatus(String hiringStatus) {
     this.hiringStatus = hiringStatus;
 }

 public LocalDateTime getApplyDate() {
     return applyDate;
 }

 public void setApplyDate(LocalDateTime applyDate) {
     this.applyDate = applyDate;
 }

 public LocalDateTime getHiringDate() {
     return hiringDate;
 }

 public void setHiringDate(LocalDateTime hiringDate) {
     this.hiringDate = hiringDate;
 }

 public LocalDateTime getRejectionDate() {
     return rejectionDate;
 }

 public void setRejectionDate(LocalDateTime rejectionDate) {
     this.rejectionDate = rejectionDate;
 }
}