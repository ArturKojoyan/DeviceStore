import { FC, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { privateRoutes, publicRoutes } from "./routes";
import { isAuthSelector } from "../store/slices/userSlice";
import {
  getDevices,
  setDevices,
  setTotalCount,
} from "../store/slices/deviceSlice";
import { fetchBrands, fetchDevices, fetchTypes } from "../axios/deviceApi";
import { getUserSelector, setIsAuth, setUser } from "../store/slices/userSlice";
import { check } from "../axios/userApi";
import { LOGIN_ROUTE } from "../utils";
import { setTypes } from "../store/slices/typeSlice";
import { setBrands } from "../store/slices/brandSlice";

const AppRouter: FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const devices = useSelector(getDevices);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setIsAuth(true));
        dispatch(setUser(data));
      })
      .catch(() => navigate(LOGIN_ROUTE))
      .finally(() => setLoading(false));
  }, [dispatch, navigate, setLoading]);

  useEffect(() => {
    fetchTypes().then((data) => dispatch(setTypes(data)));
    fetchBrands().then((data) => dispatch(setBrands(data)));
    fetchDevices().then((data) => {
      dispatch(setDevices(data.rows));
      dispatch(setTotalCount(data.count));
    });
  }, [dispatch]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <Suspense fallback={<></>}>
      <Routes>
        {isAuth &&
          privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
