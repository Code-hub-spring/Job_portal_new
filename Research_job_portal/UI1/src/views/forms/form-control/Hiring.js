import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader,
  CButton, CSpinner,
  CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react';
import axios from 'axios';
import {
    CheckCircle,
    XCircle,
    Info,
    User,
    Briefcase
} from 'lucide-react';

const API_BASE_URL_JOBS = "http://localhost:8085";
const API_BASE_URL_APPLY = "http://localhost:8086/applications";
const API_BASE_URL_STUDENTS = "http://localhost:8087/students";

const Hiring = ({ studentId: loggedInStudentId = '1' }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobDetailsMap, setJobDetailsMap] = useState({});
  const [studentDetailsMap, setStudentDetailsMap] = useState({});
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL_APPLY}/getAllApplications`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async (jobIds) => {
    try {
      const response = await axios.get(`${API_BASE_URL_JOBS}/getJobDetailsByIds`, {
        params: { jobIds: jobIds.join(',') },
      });
      const jobMap = {};
      response.data.forEach(job => {
        jobMap[job.jobId] = job;
      });
      setJobDetailsMap(jobMap);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const fetchStudentDetails = async (studentIds) => {
    try {
      const response = await axios.get(`${API_BASE_URL_STUDENTS}/getStudentDetailsByIds`, {
        params: { studentIds: studentIds.join(',') },
      });
      const studentMap = {};
      response.data.forEach(student => {
        studentMap[student.studentId] = student;
      });
      setStudentDetailsMap(studentMap);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [loggedInStudentId]);

  useEffect(() => {
    if (applications.length > 0) {
      const uniqueJobIds = [...new Set(applications.map(app => app.jobId))];
      fetchJobDetails(uniqueJobIds);

      const uniqueStudentIds = [...new Set(applications.map(app => app.studentId))];
      fetchStudentDetails(uniqueStudentIds);
    }
  }, [applications]);

  const updateJobStatus = async (jobId, status) => {
    try {
      await axios.patch(`${API_BASE_URL_JOBS}/updateJobStatus/${jobId}`, { status });
      console.log(`Job ${jobId} status updated to ${status}`);
      // Update the job details in the local state
      setJobDetailsMap(prevJobDetailsMap => {
        const updatedJobDetailsMap = { ...prevJobDetailsMap };
        if (updatedJobDetailsMap[jobId]) {
          updatedJobDetailsMap[jobId] = { ...updatedJobDetailsMap[jobId], status };
        }
        return updatedJobDetailsMap;
      });
    } catch (error) {
      console.error(`Error updating job ${jobId} status:`, error);
    }
  };

  const handleHire = async (applicationId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL_APPLY}/${applicationId}/hiring-status`,
        {},
        {
          params: { hiringStatus: 'Hired',jobStatus:'Closed' },
        }
      );
      console.log("Application Hired:", response.data);
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId ? { ...app, hiringStatus: 'Hired',jobStatus:'Closed' } : app
          
        )
      );
      setModalVisible(false);

      // Update Job Status to Closed.
      const application = applications.find(a => a.id === applicationId); //find the application
      if (application) {
          await updateJobStatus(application.jobId, 'Closed');
      }

      alert("Student Hired!");
    } catch (error) {
      console.error("Error hiring student:", error);
      alert("Failed to Hire Student");
    }
  };

  const handleReject = async (applicationId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL_APPLY}/${applicationId}/hiring-status`,
        {},
        {
          params: { hiringStatus: 'Rejected',jobStatus:'Closed' },
        }
      );
      console.log("Application Rejected:", response.data);
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId ? { ...app, hiringStatus: 'Rejected',jobStatus:'Closed' } : app
        )
      );
      setModalVisible(false);

      // Update Job Status to Closed.
      const application = applications.find(a => a.id === applicationId); //find the application
       if (application) {
          await updateJobStatus(application.jobId, 'Closed');
      }

      alert("Student Rejected.");
    } catch (error) {
      console.error("Error rejecting student:", error);
      alert("Failed to Reject Student");
    }
  };

    const showApplicationDetails = (application) => {
        setSelectedApplication(application);
        setModalVisible(true);
    };

    const getJobTitle = (jobId) => {
        return jobDetailsMap[jobId] ? jobDetailsMap[jobId].jobTitle : 'Loading...';
    };

  const getStudentName = (studentId) => {
    const student = studentDetailsMap[studentId];
    return student ? `${student.studentName}` : 'Loading...';
  };

  if (loading) return <CSpinner color="primary" />;

  return (
    <>
      <CCard>
        {/* <CCardHeader>
          <h4>Research Application Details</h4>
        </CCardHeader> */}
        <CCardBody>
          {applications.length === 0 ? (
            <p>No Job Applications found.</p>
          ) : (
            <CTable striped bordered responsive>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Job Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hiring Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Apply Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hiring Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rejection Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {applications.map((app, index) => (
                  <CTableRow key={app.id}>
                    <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                    <CTableDataCell>{getJobTitle(app.jobId)}</CTableDataCell>
                    <CTableDataCell>{getStudentName(app.studentId)}</CTableDataCell>
                    <CTableDataCell>{app.jobStatus}</CTableDataCell>
                    <CTableDataCell>{app.hiringStatus}</CTableDataCell>
                    <CTableDataCell>{new Date(app.applyDate).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{app.hiringDate ? new Date(app.hiringDate).toLocaleDateString() : '-'}</CTableDataCell>
                    <CTableDataCell>{app.rejectionDate ? new Date(app.rejectionDate).toLocaleDateString() : '-'}</CTableDataCell>
                    <CTableDataCell>
                    <CButton
                        color="primary"
                        size="sm"
                        onClick={() => showApplicationDetails(app)}
                        className="text-white
                                   hover:bg-blue-600 
                                   transition-colors duration-200
                                   shadow-md hover:shadow-lg"
                      >
                        View Details
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Improved Modal */}
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
        aria-labelledby="applicationDetailsModalTitle"
      >
        <CModalHeader>
          <CModalTitle id="applicationDetailsModalTitle" className="d-flex align-items-center">
            <Info className="mr-2" size={20} /> Application Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="p-4">
          {selectedApplication && (
            <div className="space-y-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <Briefcase className="mr-2" size={18} /> Job Details
                      </h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <span className="font-weight-bold">Job Title:</span> {getJobTitle(selectedApplication.jobId)}
                        </li>
                        {jobDetailsMap[selectedApplication.jobId] && (
                          <>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Professor Name:</span> {jobDetailsMap[selectedApplication.jobId].professorName}
                            </li>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Eligibility:</span> {jobDetailsMap[selectedApplication.jobId].eligibility}
                            </li>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Description:</span> {jobDetailsMap[selectedApplication.jobId].jobDescription}
                            </li>
                            <li className="list-group-item">
                               <span className="font-weight-bold">Application Deadline:</span> {jobDetailsMap[selectedApplication.jobId].applicationDeadline}
                            </li>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Skill Set:</span> {jobDetailsMap[selectedApplication.jobId].skillset}
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                         <User className="mr-2" size={18} /> Student Details
                      </h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="font-weight-bold">Student Name:</span> {getStudentName(selectedApplication.studentId)}
                        </li>
                        {studentDetailsMap[selectedApplication.studentId] && (
                          <>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Student ID:</span> {studentDetailsMap[selectedApplication.studentId].studentId}
                            </li>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Email:</span> {studentDetailsMap[selectedApplication.studentId].emailId}
                            </li>
                             <li className="list-group-item">
                              <span className="font-weight-bold">Qualification:</span> {studentDetailsMap[selectedApplication.studentId].qualification}
                            </li>
                            <li className="list-group-item">
                              <span className="font-weight-bold">Experience:</span> {studentDetailsMap[selectedApplication.studentId].experience}
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Application Status</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="font-weight-bold">Job Status:</span> {selectedApplication.jobStatus}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">Hiring Status:</span> {selectedApplication.hiringStatus}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">Application Date:</span> {new Date(selectedApplication.applyDate).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">Hiring Date:</span> {selectedApplication.hiringDate ? new Date(selectedApplication.hiringDate).toLocaleDateString() : '-'}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">Rejection Date:</span> {selectedApplication.rejectionDate ? new Date(selectedApplication.rejectionDate).toLocaleDateString() : '-'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter className="justify-end">
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Close
          </CButton>
          <CButton
            color="success"
            onClick={() => handleHire(selectedApplication.id)}
            disabled={selectedApplication?.hiringStatus === 'Hired' || selectedApplication?.hiringStatus === 'Rejected'}
          >
            <CheckCircle className="mr-1" size={18} /> Hire
          </CButton>
          <CButton
            color="danger"
            onClick={() => handleReject(selectedApplication.id)}
            disabled={selectedApplication?.hiringStatus === 'Hired' || selectedApplication?.hiringStatus === 'Rejected'}
          >
            <XCircle className="mr-1" size={18} /> Reject
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Hiring;
