import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

export const getAttacks = async () => {
  const response = await api.get("/attacks");

  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get("/statistics");

  return response.data;
};

export const getAttackTrend = async () => {
  const response = await api.get("/attacks/trend");

  return response.data;
};

export default api;
