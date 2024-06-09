import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";

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
  info: Array<DeviceInfo>;
  typeId: number;
  brandId: number;
}

export type EmptyObj = Record<string, never>;

export type Devices = Array<Device>;

export interface InitialState {
  devices: Devices;
  currentDevice: Device | EmptyObj;
  page: number;
  totalCount: number;
  limit: number;
}

const initialState: InitialState = {
  devices: [],
  currentDevice: {},
  page: 1,
  totalCount: 0,
  limit: 3,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevices: (currentState, action: PayloadAction<Devices>) => {
      currentState.devices = action.payload;
    },
    updateDevices: (currentState, action: PayloadAction<Device>) => {
      currentState.devices.push(action.payload);
    },
    setCurrentDevice: (currentState, action: PayloadAction<Device>) => {
      currentState.currentDevice = action.payload;
    },
    setPage: (currentState, action: PayloadAction<number>) => {
      currentState.page = action.payload;
    },
    setTotalCount: (currentState, action: PayloadAction<number>) => {
      currentState.totalCount = action.payload;
    },
  },
});

export const getDevices = (state: RootState) => state.device.devices;
export const getCurrentDevice = (state: RootState) =>
  state.device.currentDevice;
export const getPage = (state: RootState) => state.device.page;
export const getLimit = (state: RootState) => state.device.limit;
export const getTotalCount = (state: RootState) => state.device.totalCount;

export const {
  setDevices,
  setCurrentDevice,
  updateDevices,
  setPage,
  setTotalCount,
} = deviceSlice.actions;

export default deviceSlice.reducer;
