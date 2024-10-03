import { EmptyObj } from "./common";

export interface DeviceBrand {
  id: number;
  name: string;
}

export type DeviceBrands = Array<DeviceBrand>;

export interface InitialDeviceBrand {
  brands: DeviceBrands;
  selectedBrand: DeviceBrand | EmptyObj;
}
