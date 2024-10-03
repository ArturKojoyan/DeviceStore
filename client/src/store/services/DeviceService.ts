import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Device } from "../../types/device";
import type { Resp } from "../../types/common";

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "api/device",
  }),
  endpoints: (build) => ({
    fetchDevice: build.query<Device, string>({
      query: (id) => `/${id}`,
    }),
    createDevice: build.mutation<Resp<Device>, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLazyFetchDeviceQuery, useCreateDeviceMutation } = deviceApi;
