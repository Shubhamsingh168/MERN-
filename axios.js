// src/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-1t1w.onrender.com/", // 🔁 Replace with your real backend URL
  withCredentials: true,
});

export default axiosInstance;
