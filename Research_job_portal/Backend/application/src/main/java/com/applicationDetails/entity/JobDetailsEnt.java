package com.applicationDetails.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_details") // Optional: Explicit table name
public class JobDetailsEnt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @Column(nullable = false)
    private String jobTitle;

    @Column(nullable = false)
    private String jobDescription;

    @Column(nullable = false)
    private String professorName;

    @Column(nullable = false)
    private String eligibility;

    @Column(nullable = false)
    private String applicationDeadline;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String skillset;
    
    

    // Default constructor
    public JobDetailsEnt() {
    }

    // Constructor without jobId (since it's auto-generated)
    public JobDetailsEnt(String jobTitle, String jobDescription, String professorName, String eligibility,
                         String applicationDeadline, String status, String skillset) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.professorName = professorName;
        this.eligibility = eligibility;
        this.applicationDeadline = applicationDeadline;
        this.status = status;
        this.skillset = skillset;
    }

    // Getters and Setters
    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(String applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSkillset() {
        return skillset;
    }

    public void setSkillset(String skillset) {
        this.skillset = skillset;
    }
}
