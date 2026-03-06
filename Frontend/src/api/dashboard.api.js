import api from "./axios";

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const res = await api.get("/dashboard/stats");

    // return only stats object
    return res.data.stats;

  } catch (error) {
    console.error("Dashboard API error:", error);
    throw error;
  }
};