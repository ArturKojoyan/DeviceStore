import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";

export interface Brand {
  id: number;
  name: string;
}

export type EmptyObj = Record<string, never>;

export type Brands = Array<Brand>;

export interface InitialType {
  brands: Brands;
  selectedBrand: Brand | EmptyObj;
}

const initialState: InitialType = {
  brands: [],
  selectedBrand: {},
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (currentState, action: PayloadAction<Brands>) => {
      currentState.brands = action.payload;
    },
    updateBrands: (currentState, action: PayloadAction<Brand>) => {
      currentState.brands.push(action.payload);
    },
    removeBrand: (currentState, action: PayloadAction<string>) => {
      currentState.brands = currentState.brands.filter(
        (brand) => brand.name !== action.payload
      );
    },
    setSelectedBrand: (currentState, action: PayloadAction<Brand>) => {
      currentState.selectedBrand = action.payload;
    },
  },
});

export const getBrands = (state: RootState) => state.brand.brands;
export const getSelectedBrand = (state: RootState) => state.brand.selectedBrand;

export const { setBrands, setSelectedBrand, updateBrands, removeBrand } =
  brandSlice.actions;

export default brandSlice.reducer;
