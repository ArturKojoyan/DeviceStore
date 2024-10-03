import { EmptyObj } from "./common";

export interface DeviceInfo {
  id: number;
  title: string;
  description: string;
  deviceId: number;
}

export interface Device {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  info: Array<DeviceInfo> | any[];
  typeId: number;
  brandId: number;
}

export type Devices = Array<Device>;

export interface InitialDevice {
  devices: Devices;
  currentDevice: Device | EmptyObj;
  page: number;
  totalCount: number;
  limit: number;
}
