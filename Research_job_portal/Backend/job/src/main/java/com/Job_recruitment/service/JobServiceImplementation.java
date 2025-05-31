 package com.Job_recruitment.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Job_recruitment.entity.JobDetailsEnt;
import com.Job_recruitment.repository.JobDetailsRep;
import com.Job_recruitment.service.JobService;
import org.springframework.data.domain.Sort;
@Service
public class JobServiceImplementation implements JobService {
	
	@Autowired 
	private JobDetailsRep JobDetailsRep;
	
	@Override
	public JobDetailsEnt saveNewJobDetails(JobDetailsEnt jobDetails)
	{
		return JobDetailsRep.save(jobDetails);
	}

	@Override
	public List<JobDetailsEnt> fetchAllJobDetails() {
		// TODO Auto-generated method stub
		 Sort sort = Sort.by(Sort.Direction.DESC, "jobId");   
		List<JobDetailsEnt> allJobDetails =  JobDetailsRep.findAll(sort);
		return allJobDetails;
	}
	
	
	
	public List<JobDetailsEnt> getJobDetailsByIds(List<Long> jobIds) {
        return JobDetailsRep.findAllById(jobIds);
    }
	
	@Override
	public JobDetailsEnt getJobDetailsById(Long id) {
		// TODO Auto-generated method stub
		Optional<JobDetailsEnt> jobDet = JobDetailsRep.findById(id);
		if (jobDet.isPresent()) {
            return jobDet.get();
        }
		return null;
	}
	
	public JobDetailsEnt updateJobStatus(Long id, String status) {
        JobDetailsEnt jobDetails = JobDetailsRep.findById(id).orElse(null); // Use orElse
        if (jobDetails != null) {
            jobDetails.setStatus(status);
            return JobDetailsRep.save(jobDetails);
        }
        return null; // Handle the case where the job is not found
    }
	@Override
	public JobDetailsEnt updateJobDetailsById(Long id, JobDetailsEnt jobDetails) {
		// TODO Auto-generated method stub
		Optional<JobDetailsEnt> jobDet = JobDetailsRep.findById(id);
		if (jobDet.isPresent()) {
			JobDetailsEnt oldJobDetails = jobDet.get();
			
			 if (Objects.nonNull(jobDetails.getJobTitle()) && !"".equalsIgnoreCase(jobDetails.getJobTitle())) {
				 oldJobDetails.setJobTitle(jobDetails.getJobTitle());
	            }
			 if (Objects.nonNull(jobDetails.getApplicationDeadline()) && !"".equalsIgnoreCase(jobDetails.getApplicationDeadline())) {
				 oldJobDetails.setApplicationDeadline(jobDetails.getApplicationDeadline());
	            }
			 if (Objects.nonNull(jobDetails.getEligibility()) && !"".equalsIgnoreCase(jobDetails.getEligibility())) {
				 oldJobDetails.setEligibility(jobDetails.getEligibility());
	            }
			 if (Objects.nonNull(jobDetails.getJobDescription()) && !"".equalsIgnoreCase(jobDetails.getJobDescription())) {
				 oldJobDetails.setJobDescription(jobDetails.getJobDescription());
	            }
			 if (Objects.nonNull(jobDetails.getProfessorName()) && !"".equalsIgnoreCase(jobDetails.getProfessorName())) {
				 oldJobDetails.setProfessorName(jobDetails.getProfessorName());
	            }
			 if (Objects.nonNull(jobDetails.getSkillset()) && !"".equalsIgnoreCase(jobDetails.getSkillset())) {
				 oldJobDetails.setSkillset(jobDetails.getSkillset());
	            }
			 if (Objects.nonNull(jobDetails.getStatus()) && !"".equalsIgnoreCase(jobDetails.getStatus())) {
				 oldJobDetails.setStatus(jobDetails.getStatus());
	            }   
			 return JobDetailsRep.save(oldJobDetails);
		}
		return null;
	}
	
	@Override
	public String deleteJobDetailsId(Long id) {
		// TODO Auto-generated method stub
		if(JobDetailsRep.findById(id).isPresent())
		{
			JobDetailsRep.deleteById(id);
			return "Job record deleted successfully";
		}
		return "Job record is not found for delete";
	}
	
	

}
