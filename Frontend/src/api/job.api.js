import api from "./axios";

// Get all job applications
export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// Create a new job application
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Update job application (status / notes / follow-up)
export const updateJob = async (id, updateData) => {
  const response = await api.put(`/jobs/${id}`, updateData);
  return response.data;
};