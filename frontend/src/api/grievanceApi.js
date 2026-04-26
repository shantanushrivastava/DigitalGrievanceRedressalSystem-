import api from "./axiosInstance";

export const submitAnonymous = (data) => api.post("/api/grievances/submit", data);
export const submitLoggedIn = (data) => api.post("/api/grievances/submit/logged-in", data);
export const getMyGrievances = () => api.get("/api/grievances/my");
export const trackTicket = (ticketId) => api.get(`/api/tickets/${ticketId}`);
