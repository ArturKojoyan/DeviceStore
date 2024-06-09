import axios, { InternalAxiosRequestConfig } from "axios";

export const host = axios.create({ baseURL: "http://localhost:3003/" });

export const authHost = axios.create({
  baseURL: "http://localhost:3003/",
  // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);
