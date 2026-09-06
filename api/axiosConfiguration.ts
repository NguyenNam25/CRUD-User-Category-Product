import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

const axiosClient = {
  get: (url: string, params: object = {}) => instance.get(url, { params }),
  post: (url: string, data: unknown, params: object = {}) =>
    instance.post(url, data, { params }),
  put: (url: string, data: unknown, params: object = {}) =>
    instance.put(url, data, { params }),
  delete: (url: string, params: object = {}) =>
    instance.delete(url, { params }),
};

export default axiosClient;
