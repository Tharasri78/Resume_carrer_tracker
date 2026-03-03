import API from "./axios";

export const getJobs = async () => {
  const res = await API.get("/jobs");
  return res.data;
};

export const createJob = async (job) => {
  const res = await API.post("/jobs", job);
  return res.data;
};

export const updateJobStatus = async (id, status) => {
  const res = await API.put(`/jobs/${id}`, { status });
  return res.data;
};

export const deleteJob = async (id) => {
  await API.delete(`/jobs/${id}`);
};