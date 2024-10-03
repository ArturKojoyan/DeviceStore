import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import type { InitialUser, User } from "../../types/user";

const initialState: InitialUser = {
  isAuth: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
    },
  },
});

export const getUserSelector = (state: RootState) => state.user.user;
export const isAuthSelector = (state: RootState) => state.user.isAuth;

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
