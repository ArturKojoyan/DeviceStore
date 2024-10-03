import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import deviceReducer from "./slices/deviceSlice";
import typeReducer from "./slices/typeSlice";
import brandReducer from "./slices/brandSlice";
import { userApi } from "./services/UserService";
import { deviceApi } from "./services/DeviceService";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    user: userReducer,
    device: deviceReducer,
    type: typeReducer,
    brand: brandReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, deviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
