import { lazy } from "react";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  Device_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
} from "../utils";

const Admin = lazy(() => import("../pages/Admin"));
const Auth = lazy(() => import("../pages/Auth"));
const Basket = lazy(() => import("../pages/Basket"));
const Device = lazy(() => import("../pages/Device"));
const Shop = lazy(() => import("../pages/Shop"));

export const privateRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: Device_ROUTE + '/:id',
    Component: Device,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTER_ROUTE,
    Component: Auth,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
];
