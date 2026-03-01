import api from "./axios";

// Fetch dashboard stats
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};