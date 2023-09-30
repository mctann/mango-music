import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://itunes.apple.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;