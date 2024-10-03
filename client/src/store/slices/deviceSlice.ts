import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import type { Device, Devices, InitialDevice } from "../../types/device";

const initialState: InitialDevice = {
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
