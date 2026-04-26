import api from "./axiosInstance";

export const getAllGrievances = (status) =>
  api.get("/api/admin/grievances", { params: status ? { status } : {} });
export const updateGrievanceStatus = (id, data) =>
  api.patch(`/api/admin/grievances/${id}`, data);
export const getDashboardStats = () => api.get("/api/admin/stats");
