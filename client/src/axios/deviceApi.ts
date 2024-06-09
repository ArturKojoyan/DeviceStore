import { authHost, host } from ".";
import { Brand, Brands } from "../store/slices/brandSlice";
import { Device, Devices } from "../store/slices/deviceSlice";
import { Type, Types } from "../store/slices/typeSlice";

type Message = {
  success: boolean;
  message: string;
};

interface Resp<T> {
  data: T;
}

interface ManyType<T> {
  count: number;
  rows: T;
}

export const createType = async (name: string) => {
  const { data } = await authHost.post<string, Resp<Type>>("api/type", {
    name,
  });
  return data;
};

export const fetchTypes = async () => {
  const { data } = await host.get<string, Resp<Types>>("api/type");
  return data;
};

export const deleteType = async (name: string) => {
  const { data } = await authHost.delete<string, Resp<Message>>("api/type", {
    data: { name },
  });
  return data;
};

export const createBrand = async (name: string) => {
  const { data } = await authHost.post<string, Resp<Brand>>("api/brand", {
    name,
  });
  return data;
};

export const fetchBrands = async () => {
  const { data } = await host.get<string, Resp<Brands>>("api/brand");
  return data;
};

export const deleteBrand = async (name: string) => {
  const { data } = await authHost.delete<string, Resp<Message>>("api/brand", {
    data: { name },
  });
  return data;
};

export const createDevice = async (formData: FormData) => {
  const { data } = await authHost.post<string, Resp<Device>>(
    "api/device",
    formData
  );
  return data;
};

export const fetchDevice = async (id: string) => {
  const { data } = await host.get<string, Resp<Device>>(`api/device/${id}`);
  return data;
};

export const fetchDevices = async (
  typeId?: number,
  brandId?: number,
  page = 1,
  limit = 4
) => {
  const { data } = await host.get<string, Resp<ManyType<Devices>>>(
    "api/device",
    { params: { typeId, brandId, page, limit } }
  );
  return data;
};
