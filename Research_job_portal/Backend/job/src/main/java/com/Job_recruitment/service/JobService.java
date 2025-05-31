package com.Job_recruitment.service;

import java.util.List;

import com.Job_recruitment.entity.JobDetailsEnt;

public interface JobService {
	
	
		JobDetailsEnt saveNewJobDetails(JobDetailsEnt jobDetails);

	    List<JobDetailsEnt> fetchAllJobDetails();

	    JobDetailsEnt getJobDetailsById(Long id);
	    JobDetailsEnt updateJobStatus(Long id, String status);

	    JobDetailsEnt updateJobDetailsById(Long id, JobDetailsEnt jobDetails);

	    String deleteJobDetailsId(Long id);

		List<JobDetailsEnt> getJobDetailsByIds(List<Long> longJobIdList);

}
