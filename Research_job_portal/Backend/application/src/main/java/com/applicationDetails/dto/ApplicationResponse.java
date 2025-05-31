package com.applicationDetails.dto;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;


public class ApplicationResponse {

private long id;

private long jobId;
private long studentId; // Static student ID
private String jobStatus; // e.g., "Active", "Closed" (related to the job posting itself)
private String hiringStatus; // e.g., "Applied", "Reviewed", "Interviewing", "Offered", "Rejected", "Hired"
private LocalDateTime applyDate;
private LocalDateTime hiringDate;
private LocalDateTime rejectionDate;
private String jobTitle;
private String studentName;
public String getJobTitle() {
	return jobTitle;
}

public void setJobTitle(String jobTitle) {
	this.jobTitle = jobTitle;
}

// Default Constructor
public ApplicationResponse() {
   this.applyDate = LocalDateTime.now();
   this.hiringStatus = "Applied"; // Initial status upon application
}

// Constructor with jobId and studentId
public ApplicationResponse(long jobId, long studentId) {
   this.jobId = jobId;
   this.studentId = studentId;
   this.applyDate = LocalDateTime.now();
   this.hiringStatus = "Applied";
}

// Getters and Setters
public Long getId() {
   return id;
}

public void setId(long id) {
   this.id = id;
}

public long getJobId() {
   return jobId;
}

public void setJobId(long jobId) {
   this.jobId = jobId;
}

public long getStudentId() {
   return studentId;
}

public void setStudentId(long studentId) {
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

public void setStudentName(String studentName) {
	// TODO Auto-generated method stub
	 this.studentName = studentName;
	
}
}