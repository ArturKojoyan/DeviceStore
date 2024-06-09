import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";

export type User = {
  id?: number;
  email?: string;
  role?: "ADMIN" | "USER";
};

export interface UserState {
  isAuth: boolean;
  user: User;
}

const initialState: UserState = {
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const getUserSelector = (state: RootState) => state.user.user;
export const isAuthSelector = (state: RootState) => state.user.isAuth;

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
