// src/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend-api.onrender.com", // 🔁 Replace with your real backend URL
  withCredentials: true,
});

export default axiosInstance;
