package com.applicationDetails.service;

import com.applicationDetails.dto.ApplicationResponse;
//import com.Job_recruitment.entity.JobDetailsEnt;
//import com.Job_recruitment.entity.JobDetailsEnt;
import com.applicationDetails.entity.ApplicationDetails;
import com.applicationDetails.entity.JobDetailsEnt;
import com.applicationDetails.entity.Student;
import com.applicationDetails.repository.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    // You might also have a RestTemplate or WebClient to communicate with the Job Service
    // if you need to validate the jobId.
    @Autowired
    private RestTemplate restTemplate;
    private String jobURL ="http://localhost:8085/getJobDetailsById/";
    private String studentURL ="http://localhost:8087/students/getStudentById";
    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository, RestTemplate restTemplate) {
        this.applicationRepository = applicationRepository;
        this.restTemplate = restTemplate;
    }

    public ApplicationDetails createApplication(ApplicationDetails applicationDetails) {
        // You might want to add validation here, e.g., check if the jobId exists
        // by calling the Job Service.
        return applicationRepository.save(applicationDetails);
    }
  
    public List<ApplicationDetails> getAllApplications() {
		// TODO Auto-generated method stub
    	Sort sort = Sort.by(Sort.Direction.DESC, "id"); 
		List<ApplicationDetails> allJobDetails = applicationRepository.findAll(sort);
		return allJobDetails;
    }
    
    public List<ApplicationResponse> getAllApplicaetions() {
		// TODO Auto-generated method stub
    	Sort sort = Sort.by(Sort.Direction.DESC, "id"); 
    	List<ApplicationDetails> allJobDetails = applicationRepository.findAll(sort);
		List<ApplicationResponse> listApplicationResponse = new ArrayList<>();
		allJobDetails.forEach(application->{

			ResponseEntity<Student> response = restTemplate.exchange(
				studentURL+"/"+application.getStudentId(),
		        HttpMethod.GET,
		        null,
		        Student.class);
			Student st = response.getBody();
			ApplicationResponse applicationResponse=new ApplicationResponse();
			applicationResponse.setStudentName(st.getStudentName());
			listApplicationResponse.add(applicationResponse);

			});
		allJobDetails.forEach(applicationDetails -> {
			ResponseEntity<JobDetailsEnt> response = restTemplate.exchange(
					jobURL+applicationDetails.getJobId(),
					HttpMethod.GET,
					null,
					JobDetailsEnt.class

			);
			JobDetailsEnt jobDetailsEnt=response.getBody();
			ApplicationResponse applicationResponse=new ApplicationResponse();
			applicationResponse.setJobTitle(jobDetailsEnt.getJobTitle());
			listApplicationResponse.add(applicationResponse);
		});

		

		//return listApplicationResponse;
		
		return listApplicationResponse;
    }
 
    public Optional<ApplicationDetails> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public List<ApplicationDetails> getApplicationsByJobId(String jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<ApplicationDetails> getApplicationsByStudentId(String studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    
    
    public ApplicationDetails updateApplication(ApplicationDetails applicationDetails) {
        return applicationRepository.save(applicationDetails);
    }

    public boolean deleteApplication(Long id) {
        if (applicationRepository.existsById(id)) {
            applicationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}