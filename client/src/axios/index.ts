import axios, { InternalAxiosRequestConfig } from "axios";

export const host = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);
