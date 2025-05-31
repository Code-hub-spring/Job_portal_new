import React, { useState, useCallback, useEffect } from 'react';
import {
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react';
import axios from 'axios';
import EditForm from './EditForm';
import Hiring from './Hiring';

const ResearchProjectForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    professorName: '',
    jobDescription: '',
    eligibility: '',
    applicationDeadline: '',
    skillset: '',
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.professorName) newErrors.professorName = 'Professor name is required';
    if (!formData.jobDescription) newErrors.jobDescription = 'Job description is required';
    if (!formData.eligibility) newErrors.eligibility = 'Eligibility is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    if (!formData.skillset) newErrors.skillset = 'Skill set is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8085/getAllJobDetails/`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8085/AddJobDetails', formData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        alert('Project Created Successfully!');
        console.log(response.data);
        fetchJobs();
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTabs activeItemKey={activeTab} onTabChange={handleTabClick}>
              <CTabList variant="underline" layout="justified" className="mb-4">
                <CTab aria-controls="home-tab-pane" itemKey={1}>
                  Add New Job
                </CTab>
                <CTab aria-controls="manageJob-tab-pane" itemKey={2}>
                  Manage Jobs
                </CTab>
                <CTab aria-controls="student-tab-pane" itemKey={3}>
                  Hire Student
                </CTab>
              </CTabList>
              <CTabContent>
                {/* Add New Job Tab */}
                <CTabPanel className="p-4" aria-labelledby="home-tab-pane" itemKey={1}>
                  <CCard>
                    <CCardBody>
                      <CForm onSubmit={handleSubmit}>
                        <CRow className="g-4">
                          <CCol md={6}>
                            <FormGroup
                              label="Job Title"
                              id="jobTitle"
                              type="text"
                              placeholder="Enter Job title"
                              value={formData.jobTitle}
                              handleChange={handleChange}
                              error={errors.jobTitle}
                            />
                          </CCol>
                          <CCol md={6}>
                            <FormGroup
                              label="Professor Name"
                              id="professorName"
                              type="text"
                              placeholder="Enter professor's name"
                              value={formData.professorName}
                              handleChange={handleChange}
                              error={errors.professorName}
                            />
                          </CCol>
                          <CCol md={12}>
                            <FormGroup
                              label="Job Description"
                              id="jobDescription"
                              type="textarea"
                              rows={4}
                              placeholder="Enter job details"
                              value={formData.jobDescription}
                              handleChange={handleChange}
                              error={errors.jobDescription}
                            />
                          </CCol>
                          <CCol md={6}>
                            <FormGroup
                              label="Eligibility Criteria"
                              id="eligibility"
                              type="select"
                              options={['Bachelor Degree', 'Masters']}
                              value={formData.eligibility}
                              handleChange={handleChange}
                              error={errors.eligibility}
                            />
                          </CCol>
                          <CCol md={6}>
                            <FormGroup
                              label="Application Deadline"
                              id="applicationDeadline"
                              type="date"
                              value={formData.applicationDeadline}
                              handleChange={handleChange}
                              error={errors.applicationDeadline}
                            />
                          </CCol>
                          <CCol md={12}>
                            <FormGroup
                              label="Skill Set"
                              id="skillset"
                              type="textarea"
                              rows={3}
                              placeholder="Required skill set"
                              value={formData.skillset}
                              handleChange={handleChange}
                              error={errors.skillset}
                            />
                          </CCol>
                          <CCol md={6}>
                            <FormGroup
                              label="Status"
                              id="status"
                              type="select"
                              options={['Open', 'In Progress', 'Closed']}
                              value={formData.status}
                              handleChange={handleChange}
                              error={errors.status}
                            />
                          </CCol>
                        </CRow>
                        <div className="mt-4 d-flex justify-content-end">
                          <CButton color="primary" type="submit" className="px-4 py-2 shadow-sm">
                            Add New Position
                          </CButton>
                        </div>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CTabPanel>

                {/* Manage Jobs Tab */}
                <CTabPanel className="p-3" aria-labelledby="manageJob-tab-pane" itemKey={2}>
                  <CCard>
                    <CCardBody>
                      {loading ? <CSpinner color="primary" /> : <EditForm jobs={jobs} fetchJobs={fetchJobs} />}
                    </CCardBody>
                  </CCard>
                </CTabPanel>

                {/* Hire Student Tab */}
                <CTabPanel className="p-3" aria-labelledby="student-tab-pane" itemKey={3}>
                  <Hiring />
                </CTabPanel>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const FormGroup = ({ label, id, type, placeholder, value, handleChange, error, rows, options }) => (
  <div className="mb-3">
    <CFormLabel htmlFor={id}>{label}</CFormLabel>
    {type === 'textarea' ? (
      <CFormTextarea id={id} rows={rows} placeholder={placeholder} value={value} onChange={handleChange} />
    ) : type === 'select' ? (
      <CFormSelect
        size="sm"
        className="mb-3"
        aria-label={`Select ${label}`}
        id={id}
        value={value}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select the {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </CFormSelect>
    ) : (
      <CFormInput type={type} id={id} placeholder={placeholder} value={value} onChange={handleChange} />
    )}
    {error && <div className="text-danger">{error}</div>}
  </div>
);

export default ResearchProjectForm;
