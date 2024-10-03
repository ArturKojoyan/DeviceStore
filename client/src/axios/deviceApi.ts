import { authHost, host } from ".";
import type { Many, Message } from "../types/api";
import type { Resp } from "../types/common";
import type { Device, Devices } from "../types/device";
import type { DeviceBrand, DeviceBrands } from "../types/deviceBrand";
import type { DeviceType, DeviceTypes } from "../types/deviceType";

export const createType = async (name: string) => {
  const { data } = await authHost.post<string, Resp<DeviceType>>("api/type", {
    name,
  });
  return data;
};

export const fetchTypes = async () => {
  const { data } = await host.get<string, Resp<DeviceTypes>>("api/type");
  return data;
};

export const deleteType = async (name: string) => {
  const { data } = await authHost.delete<string, Resp<Message>>("api/type", {
    data: { name },
  });
  return data;
};

export const createBrand = async (name: string) => {
  const { data } = await authHost.post<string, Resp<DeviceBrand>>("api/brand", {
    name,
  });
  return data;
};

export const fetchBrands = async () => {
  const { data } = await host.get<string, Resp<DeviceBrands>>("api/brand");
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
  const { data } = await host.get<string, Resp<Many<Devices>>>("api/device", {
    params: { typeId, brandId, page, limit },
  });
  return data;
};
