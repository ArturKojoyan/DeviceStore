import { FC, Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { privateRoutes, publicRoutes } from "./routes";
import { isAuthSelector } from "../store/slices/userSlice";
import { useCheckIsAuth, useFetchData } from "./hooks";

const AppRouter: FC = () => {
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector(isAuthSelector);

  useCheckIsAuth(setLoading);
  useFetchData();

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
