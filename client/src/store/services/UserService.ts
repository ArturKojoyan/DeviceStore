import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Data } from "../../types/user";
import type { Resp } from "../../types/common";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "api/user",
  }),
  endpoints: (build) => ({
    check: build.query<Resp<Data>, void>({
      query: () => "/auth",
    }),
  }),
});

export const { useCheckQuery } = userApi;
