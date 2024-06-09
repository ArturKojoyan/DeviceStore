import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import deviceReducer from "./slices/deviceSlice";
import typeSlice from "./slices/typeSlice";
import brandSlice from "./slices/brandSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    type: typeSlice,
    brand: brandSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
