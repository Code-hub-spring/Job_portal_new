import React, { useEffect, useState } from 'react';
import {
    CCard, CCardBody, CCardHeader,
    CButton, CSpinner,
    CTable, CTableHead, CTableRow, CTableHeaderCell,
    CTableBody, CTableDataCell
} from '@coreui/react';
import axios from 'axios';

const API_BASE_URL_JOBS = "http://localhost:8085";
const API_BASE_URL_APPLY = "http://localhost:8086/applications";

const StudentDashboard = ({ studentId = '1' }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL_JOBS}/getAllJobDetails/`);
            setJobs(response.data);
            fetchAppliedJobs();
        } catch (error) {
            console.error("Error fetching job details:", error);
        } finally {
            setLoading(false);
        }
    };
 
    const fetchAppliedJobs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL_APPLY}/students/${studentId}`);
            const appliedJobIds = response.data.map(application => application.jobId);
            setAppliedJobs(appliedJobIds);
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleApply = async (job) => {
        if (!studentId) {
            alert("Student ID is not available.");
            return;
        }

        const jobIdToUse = job.jobId || job.id;

        const applicationData = {
            jobId: jobIdToUse,
            studentId: studentId,
            jobStatus: 'In Progress',
            hiringStatus: 'Applied',
            applyDate: new Date().toISOString(),
            hiringDate: null,
            rejectionDate: null,
        };

        try {
            await axios.post(
                `${API_BASE_URL_APPLY}/ApplyJob`,
                applicationData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            alert("Application Submitted Successfully!");
            setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobIdToUse]);
            updateJobStatus(jobIdToUse, 'In Progress');
        } catch (error) {
            console.error("Error submitting application:", error.message);
            alert("Error submitting application. Please try again.");
        }
    };

    const updateJobStatus = async (jobId, status) => {
        try {
            await axios.patch(`${API_BASE_URL_JOBS}/updateJobStatus/${jobId}`, { status });
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    (job.jobId || job.id) === jobId ? { ...job, status } : job
                )
            );
        } catch (error) {
            console.error(`Error updating job ${jobId} status:`, error);
        }
    };

    if (loading) return <CSpinner color="primary" />;

    const sortedJobs = [...jobs].sort((a, b) => {
        if (a.status === 'Open' && b.status !== 'Open') return -1;
        if (a.status !== 'Open' && b.status === 'Open') return 1;
        return 0;
    });

    const currentJobs = sortedJobs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <CCard>
            <CCardHeader>
                <h4>Job Postings</h4>
            </CCardHeader>
            <CCardBody>
                {sortedJobs.length === 0 ? (
                    <p>No job postings found.</p>
                ) : (
                    <>
                        <CTable striped bordered responsive>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Job Title</CTableHeaderCell>
                                    <CTableHeaderCell>Professor</CTableHeaderCell>
                                    <CTableHeaderCell>Eligibility</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>Deadline</CTableHeaderCell>
                                    <CTableHeaderCell>Skill Set</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {currentJobs.map((job, index) => {
                                    const jobId = job.jobId || job.id;
                                    const status = job.status;
                                    const isApplied = appliedJobs.includes(jobId);

                                    let actionButton;

                                    if (isApplied || status === 'In Progress') {
                                        actionButton = (
                                            <CButton color="secondary" size="sm" disabled>
                                                Applied
                                            </CButton>
                                        );
                                    } else if (status === 'Open') {
                                        actionButton = (
                                            <CButton color="warning" size="sm" onClick={() => handleApply(job)}>
                                                Apply Job
                                            </CButton>
                                        );
                                    } else {
                                        actionButton = (
                                            <CButton color="secondary" size="sm" disabled>
                                                Closed
                                            </CButton>
                                        );
                                    }

                                    return (
                                        <CTableRow
                                            key={jobId}
                                            className={status === 'Open' ? 'table-success' : ''}
                                        >
                                            <CTableDataCell>{indexOfFirstItem + index + 1}</CTableDataCell>
                                            <CTableDataCell>{job.jobTitle}</CTableDataCell>
                                            <CTableDataCell>{job.professorName}</CTableDataCell>
                                            <CTableDataCell>{job.eligibility}</CTableDataCell>
                                            <CTableDataCell>{job.jobDescription}</CTableDataCell>
                                            <CTableDataCell>{job.applicationDeadline}</CTableDataCell>
                                            <CTableDataCell>{job.skillset}</CTableDataCell>
                                            <CTableDataCell>{status}</CTableDataCell>
                                            <CTableDataCell>{actionButton}</CTableDataCell>
                                        </CTableRow>
                                    );
                                })}
                            </CTableBody>
                        </CTable>

                        {/* Pagination Controls */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <CButton color="secondary" disabled={currentPage === 1} onClick={handlePrev}>
                                Previous
                            </CButton>
                            <span>Page {currentPage} of {totalPages}</span>
                            <CButton color="secondary" disabled={currentPage === totalPages} onClick={handleNext}>
                                Next
                            </CButton>
                        </div>
                    </>
                )}
            </CCardBody>
        </CCard>
    );
};

export default StudentDashboard;
