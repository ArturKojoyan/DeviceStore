import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import type {
  DeviceType,
  DeviceTypes,
  InitialDeviceType,
} from "../../types/deviceType";
import { EmptyObj } from "../../types/common";

const initialState: InitialDeviceType = {
  types: [],
  selectedType: {},
};

export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setTypes: (currentState, action: PayloadAction<DeviceTypes>) => {
      currentState.types = action.payload;
    },
    updateTypes: (currentState, action: PayloadAction<DeviceType>) => {
      currentState.types.push(action.payload);
    },
    removeType: (currentState, action: PayloadAction<string>) => {
      currentState.types = currentState.types.filter(
        (type) => type.name !== action.payload
      );
    },
    setSelectedType: (
      currentState,
      action: PayloadAction<DeviceType | EmptyObj>
    ) => {
      currentState.selectedType = action.payload;
    },
  },
});

export const getTypes = (state: RootState) => state.type.types;
export const getSelectedType = (state: RootState) => state.type.selectedType;

export const { setTypes, setSelectedType, updateTypes, removeType } =
  typeSlice.actions;

export default typeSlice.reducer;
