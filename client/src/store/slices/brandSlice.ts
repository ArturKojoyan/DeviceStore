import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import type {
  DeviceBrand,
  DeviceBrands,
  InitialDeviceBrand,
} from "../../types/deviceBrand";
import { EmptyObj } from "../../types/common";

const initialState: InitialDeviceBrand = {
  brands: [],
  selectedBrand: {},
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (currentState, action: PayloadAction<DeviceBrands>) => {
      currentState.brands = action.payload;
    },
    updateBrands: (currentState, action: PayloadAction<DeviceBrand>) => {
      currentState.brands.push(action.payload);
    },
    removeBrand: (currentState, action: PayloadAction<string>) => {
      currentState.brands = currentState.brands.filter(
        (brand) => brand.name !== action.payload
      );
    },
    setSelectedBrand: (
      currentState,
      action: PayloadAction<DeviceBrand | EmptyObj>
    ) => {
      currentState.selectedBrand = action.payload;
    },
  },
});

export const getBrands = (state: RootState) => state.brand.brands;
export const getSelectedBrand = (state: RootState) => state.brand.selectedBrand;

export const { setBrands, setSelectedBrand, updateBrands, removeBrand } =
  brandSlice.actions;

export default brandSlice.reducer;
