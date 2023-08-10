import axios from "axios";
import { RefreshToken } from "../constants/routes/backend/auth-routes";
import store from "../store";
import { logout, setAccessToken } from "../store/auth-slice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, //sets the default configuration for Axios to include credentials (cookies) with every request.
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) config.headers["Authorization"] = accessToken;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["authorization"];
    if (accessToken) store.dispatch(setAccessToken({ accessToken }));
    return response;
  },
  async function (error) {
    const initialRequest = error.config;

    if (
      error?.response?.data?.error === "Access Token expired" &&
      !initialRequest._retry
    ) {
      initialRequest._retry = true;

      try {
        const { headers } = await api.post(RefreshToken);
        const accessToken = headers["authorization"];
        initialRequest.headers["Authorization"] = accessToken;

        return api(initialRequest);
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

const generalApi = {
  get: (url, params = {}) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  patch: (url, data) => api.patch(url, { data }),
  delete: (url, data) => api.delete(url, { data }),
};

export default generalApi;
