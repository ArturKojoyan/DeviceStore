import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  getUserSelector,
  isAuthSelector,
  setIsAuth,
  setUser,
} from "../store/slices/userSlice";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils";

const NavbarComponent: FC = () => {
  const isAuth = useSelector(isAuthSelector);
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setIsAuth(false));
    dispatch(setUser({}));
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };

  return (
    <Navbar bg="primary" data-bs-theme="light" expand="lg">
      <Container>
        <Nav.Link href={SHOP_ROUTE} className="text-white">
          Home
        </Nav.Link>
        {isAuth ? (
          <Nav className="ml-auto">
            {user.role === "ADMIN" && (
              <Button
                variant="light"
                onClick={() => navigate(ADMIN_ROUTE)}
                className="me-2"
              >
                Admin Panel
              </Button>
            )}
            <Button variant="light" className="ml-4" onClick={logOut}>
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="light" onClick={() => navigate(LOGIN_ROUTE)}>
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
