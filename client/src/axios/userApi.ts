import { authHost, host } from ".";
import { jwtDecode } from "jwt-decode";
import { User } from "../store/slices/userSlice";

type Resp = { data: Data };

interface Data {
  token: string;
}

export const register = async (email: string, password: string) => {
  const { data } = await host.post<string, Resp>("api/user/register", {
    email,
    password,
    role: "ADMIN",
  });
  return jwtDecode<User>(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await host.post<string, Resp>("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode<User>(data.token);
};

export const check = async () => {
  const { data } = await authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode<User>(data.token);
};
