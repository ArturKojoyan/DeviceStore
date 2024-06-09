import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";

export interface Type {
  id: number;
  name: string;
}

export type EmptyObj = Record<string, never>;

export type Types = Array<Type>;

export interface InitialType {
  types: Types;
  selectedType: Type | EmptyObj;
}

const initialState: InitialType = {
  types: [],
  selectedType: {},
};

export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setTypes: (currentState, action: PayloadAction<Types>) => {
      currentState.types = action.payload;
    },
    updateTypes: (currentState, action: PayloadAction<Type>) => {
      currentState.types.push(action.payload);
    },
    removeType: (currentState, action: PayloadAction<string>) => {
      currentState.types = currentState.types.filter(
        (type) => type.name !== action.payload
      );
    },
    setSelectedType: (currentState, action: PayloadAction<Type>) => {
      currentState.selectedType = action.payload;
    },
  },
});

export const getTypes = (state: RootState) => state.type.types;
export const getSelectedType = (state: RootState) => state.type.selectedType;

export const { setTypes, setSelectedType, updateTypes, removeType } =
  typeSlice.actions;

export default typeSlice.reducer;
