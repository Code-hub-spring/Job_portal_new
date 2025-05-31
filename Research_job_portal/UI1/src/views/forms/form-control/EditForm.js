import React, { useState } from 'react';
import {
  CCard, CCardBody, CCardHeader,
  CRow, CCol, CButton, CModal,
  CModalHeader, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormInput, CFormTextarea, CFormSelect
} from '@coreui/react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8085";

const EditForm = ({ jobs, fetchJobs }) => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (job) => {
    const jobWithJobId = { ...job, jobId: job.jobId || job.id }; // ensure jobId is present
    setSelectedJob(jobWithJobId);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedJob((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/editJobDetails/${selectedJob.jobId}`, selectedJob, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert("Job updated successfully!");
      fetchJobs();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteJobDetailsId/${jobId}`);
      alert("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <div>
      {jobs.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        <>
          {currentJobs.map((job) => (
            <CCard className="mb-4" key={job.jobId}>
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{job.jobTitle}</h5>
                <div>
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(job)}>Edit</CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(job.jobId)}>Delete</CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-2"><CCol sm="3"><strong>Description:</strong></CCol><CCol>{job.jobDescription}</CCol></CRow>
                <CRow className="mb-2"><CCol sm="3"><strong>Professor:</strong></CCol><CCol>{job.professorName}</CCol></CRow>
                <CRow className="mb-2"><CCol sm="3"><strong>Eligibility:</strong></CCol><CCol>{job.eligibility}</CCol></CRow>
                <CRow className="mb-2"><CCol sm="3"><strong>Deadline:</strong></CCol><CCol>{job.applicationDeadline}</CCol></CRow>
                <CRow className="mb-2"><CCol sm="3"><strong>Skill Set:</strong></CCol><CCol>{job.skillset}</CCol></CRow>
                <CRow className="mb-2"><CCol sm="3"><strong>Status:</strong></CCol><CCol>{job.status}</CCol></CRow>
              </CCardBody>
            </CCard>
          ))}

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-3">
            <CButton
              color="primary"
              className="me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </CButton>
            <span className="align-self-center">Page {currentPage} of {totalPages}</span>
            <CButton
              color="primary"
              className="ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </CButton>
          </div>
        </>
      )}

      {/* Edit Modal */}
      <CModal visible={visible} onClose={handleCloseModal}>
        <CModalHeader closeButton>Edit Job Details</CModalHeader>
        <CModalBody>
          {selectedJob && (
            <CForm>
              <CFormLabel htmlFor="jobTitle">Job Title</CFormLabel>
              <CFormInput id="jobTitle" value={selectedJob.jobTitle} onChange={handleInputChange} />

              <CFormLabel htmlFor="jobDescription" className="mt-2">Job Description</CFormLabel>
              <CFormTextarea id="jobDescription" value={selectedJob.jobDescription} onChange={handleInputChange} />

              <CFormLabel htmlFor="professorName" className="mt-2">Professor Name</CFormLabel>
              <CFormInput id="professorName" value={selectedJob.professorName} onChange={handleInputChange} />

              <CFormLabel htmlFor="eligibility" className="mt-2">Eligibility</CFormLabel>
              <CFormSelect id="eligibility" value={selectedJob.eligibility} onChange={handleInputChange}>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Masters">Masters</option>
              </CFormSelect>

              <CFormLabel htmlFor="applicationDeadline" className="mt-2">Application Deadline</CFormLabel>
              <CFormInput id="applicationDeadline" type="date" value={selectedJob.applicationDeadline} onChange={handleInputChange} />

              <CFormLabel htmlFor="skillset" className="mt-2">Skill Set</CFormLabel>
              <CFormTextarea id="skillset" value={selectedJob.skillset} onChange={handleInputChange} />

              <CFormLabel htmlFor="status" className="mt-2">Status</CFormLabel>
              <CFormSelect id="status" value={selectedJob.status} onChange={handleInputChange}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </CFormSelect>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>Cancel</CButton>
          <CButton color="primary" onClick={handleUpdate}>Save Changes</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default EditForm;
