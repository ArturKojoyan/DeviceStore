import { FunctionComponent as FC, useState } from "react";
import { Button, Card, Container, Form, Nav, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE } from "../utils";
import { login, register } from "../axios/userApi";
import { setIsAuth, setUser } from "../store/slices/userSlice";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const action = async () => {
    try {
      let user;
      if (isLogin) {
        user = await login(email, password);
      } else {
        user = await register(email, password);
      }
      console.log(user, "user");
      dispatch(setIsAuth(true));
      dispatch(setUser(user));
      navigate(SHOP_ROUTE);
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2>{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3">
            {isLogin ? (
              <div className="d-flex">
                No account ? <Nav.Link href={REGISTER_ROUTE}>Register</Nav.Link>
              </div>
            ) : (
              <div className="d-flex">
                Have account ? <Nav.Link href={LOGIN_ROUTE}>Login</Nav.Link>
              </div>
            )}
            <Button variant="outline-success" className="mt-3" onClick={action}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth as FC;
