import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
  postFormData: (url: string, data: FormData) => {
    const formInstance = axios.create({
      baseURL: "http://localhost:3001",
      withCredentials: true,
      // Không set Content-Type, để browser tự động set với boundary
    });

    // Add interceptor cho form instance
    formInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );

    return formInstance.post(url, data);
  },
  put: (url: string, data: unknown, params: object = {}) =>
    instance.put(url, data, { params }),
  putFormData: (url: string, data: FormData) => {
    const formInstance = axios.create({
      baseURL: "http://localhost:3001",
      withCredentials: true,
    });

    formInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );

    return formInstance.put(url, data);
  },
  delete: (url: string, params: object = {}) =>
    instance.delete(url, { params }),
};

export default axiosClient;
