package com.applicationDetails.repository;

import com.applicationDetails.entity.ApplicationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationDetails, Long> {
    List<ApplicationDetails> findByJobId(String jobId);
    List<ApplicationDetails> findByStudentId(String studentId);
}