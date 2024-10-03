import { EmptyObj } from "./common";

export interface DeviceType {
  id: number;
  name: string;
}

export type DeviceTypes = Array<DeviceType>;

export interface InitialDeviceType {
  types: DeviceTypes;
  selectedType: DeviceType | EmptyObj;
}
