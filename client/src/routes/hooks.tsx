import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { check } from "../axios/userApi";
import { isAuthSelector, setIsAuth, setUser } from "../store/slices/userSlice";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils";
import { setTypes } from "../store/slices/typeSlice";
import { setBrands } from "../store/slices/brandSlice";
import { fetchBrands, fetchTypes } from "../axios/deviceApi";

export const useCheckIsAuth = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setIsAuth(true));
        dispatch(setUser(data));
      })
      .catch(() => {
        location.pathname !== LOGIN_ROUTE &&
          location.pathname !== REGISTER_ROUTE &&
          navigate(LOGIN_ROUTE);
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate, setLoading, location.pathname]);
};

export const useFetchData = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      fetchTypes().then((data) => dispatch(setTypes(data)));
      fetchBrands().then((data) => dispatch(setBrands(data)));
    }
  }, [dispatch, isAuth]);
};
