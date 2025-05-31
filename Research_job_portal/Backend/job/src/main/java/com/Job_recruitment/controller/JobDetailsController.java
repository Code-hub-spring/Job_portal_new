package com.Job_recruitment.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.Job_recruitment.entity.JobDetailsEnt;
import com.Job_recruitment.service.JobService;


@RestController

@CrossOrigin(origins = "http://20.171.65.218:3000", allowCredentials = "true")

public class JobDetailsController {
	
	@Autowired
	private JobService JobServ;
	
	@PostMapping("/AddJobDetails")
    public JobDetailsEnt saveNewJobDetails(@RequestBody JobDetailsEnt JobDetailsEnt) {
        return JobServ.saveNewJobDetails(JobDetailsEnt);
    }

	@PutMapping("/editJobDetails/{id}")
    public JobDetailsEnt editJobDetails(@PathVariable("id") Long id, @RequestBody JobDetailsEnt JobDetailsEnt) {
        return JobServ.updateJobDetailsById(id,JobDetailsEnt);
    }
	
	@GetMapping("/getJobDetailsById/{id}")
	 public JobDetailsEnt getJobDetailsById(@PathVariable("id") Long id) {
	        return JobServ.getJobDetailsById(id);
	 }

	@GetMapping("/getJobDetailsByIds")
    public List<JobDetailsEnt> getJobDetailsByIds(@RequestParam("jobIds") String jobIds) {
        List<String> jobIdList = Arrays.asList(jobIds.split(","));
        List<Long> longJobIdList = jobIdList.stream()
                .map(Long::parseLong)
                .collect(Collectors.toList());
        return JobServ.getJobDetailsByIds(longJobIdList);
    }
	
	@GetMapping("/getAllJobDetails/")
    public List<JobDetailsEnt>  fetchAllJobDetails() {
        return JobServ.fetchAllJobDetails();
    }
	    
	@PatchMapping("/updateJobStatus/{id}") // New endpoint to update job status
    public JobDetailsEnt updateJobStatus(@PathVariable("id") Long id, @RequestBody JobDetailsEnt jobDetails) {
        String status = jobDetails.getStatus(); // Get the status from the request body.
        return JobServ.updateJobStatus(id, status);
    }
	
	@DeleteMapping("/deleteJobDetailsId/{id}")
    public String deleteEmployee(@PathVariable("id") Long id) {
        return JobServ.deleteJobDetailsId(id);
    }  

}
