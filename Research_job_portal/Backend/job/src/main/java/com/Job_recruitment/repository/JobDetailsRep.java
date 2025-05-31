package com.Job_recruitment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Job_recruitment.entity.*;
import com.Job_recruitment.entity.JobDetailsEnt;

@Repository
public interface JobDetailsRep extends JpaRepository<JobDetailsEnt,Long>{


	
}
