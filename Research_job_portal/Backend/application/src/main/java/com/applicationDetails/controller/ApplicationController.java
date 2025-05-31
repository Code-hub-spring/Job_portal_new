package com.applicationDetails.controller;

//import com.Job_recruitment.entity.JobDetailsEnt;
import com.applicationDetails.dto.ApplicationResponse;
import com.applicationDetails.entity.ApplicationDetails;
import com.applicationDetails.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://20.171.65.218:3000", allowCredentials = "true")
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

	@PostMapping("/ApplyJob")
    public ResponseEntity<ApplicationDetails> createApplication(@RequestBody ApplicationDetails applicationDetails) {
        ApplicationDetails createdApplication = applicationService.createApplication(applicationDetails);
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }
	
	  @GetMapping("/getAllApplications")
	    public ResponseEntity<List<ApplicationDetails>> getAllApplications() {
	        List<ApplicationDetails> applications = applicationService.getAllApplications();
	        return ResponseEntity.ok(applications);
	    }
	
	  @GetMapping("/getAllApplicaetions")
	    public ResponseEntity<List<ApplicationResponse>> getAllApplicaetions() {
	        List<ApplicationResponse> applications = applicationService.getAllApplicaetions();
	        return ResponseEntity.ok(applications);
	    }
	
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDetails> getApplicationById(@PathVariable Long id) {
        Optional<ApplicationDetails> application = applicationService.getApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<List<ApplicationDetails>> getApplicationsByJobId(@PathVariable String jobId) {
        List<ApplicationDetails> applications = applicationService.getApplicationsByJobId(jobId);
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDetails> updateApplication(@PathVariable Long id, @RequestBody ApplicationDetails updatedApplicationDetails) {
        Optional<ApplicationDetails> existingApplication = applicationService.getApplicationById(id);
        if (existingApplication.isPresent()) {
            updatedApplicationDetails.setId(id);
            ApplicationDetails savedApplication = applicationService.updateApplication(updatedApplicationDetails);
            return ResponseEntity.ok(savedApplication);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/hiring-status")
    public ResponseEntity<ApplicationDetails> updateHiringStatus(
            @PathVariable Long id,
            @RequestParam String hiringStatus,
            @RequestParam String jobStatus) {

        Optional<ApplicationDetails> existingApplication = applicationService.getApplicationById(id);

        return existingApplication.map(app -> {
            app.setHiringStatus(hiringStatus);
            app.setJobStatus(jobStatus); // ← Add this line

            if ("Hired".equalsIgnoreCase(hiringStatus)) {
                app.setHiringDate(java.time.LocalDateTime.now());
                app.setRejectionDate(null);
            } else if ("Rejected".equalsIgnoreCase(hiringStatus)) {
                app.setRejectionDate(java.time.LocalDateTime.now());
                app.setHiringDate(null);
            }

            return ResponseEntity.ok(applicationService.updateApplication(app));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}