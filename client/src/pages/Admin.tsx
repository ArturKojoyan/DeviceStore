import { FC, useReducer } from "react";
import { Button, Container } from "react-bootstrap";
import CreateTypeModal from "../components/Modals/CreateType";
import CreateBrandModal from "../components/Modals/CreateBrand";
import CreateDeviceModal from "../components/Modals/CreateDevice";
import { useSelector } from "react-redux";
import { getTypes } from "../store/slices/typeSlice";

enum Kind {
  TYPE = "TYPE",
  BRAND = "BRAND",
  DEVICE = "DEVICE",
}

interface VisibilityAction {
  type: Kind;
  payload: boolean;
}

interface VisibilityState {
  visibleType: boolean;
  visibleBrand: boolean;
  visibleDevice: boolean;
}

const Admin: FC = () => {
  const [state, dispatch] = useReducer(visibilityReducer, {
    visibleType: false,
    visibleBrand: false,
    visibleDevice: false,
  });

  const types = useSelector(getTypes);
  console.log("🚀 ~ types:", types)

  function visibilityReducer(state: VisibilityState, action: VisibilityAction) {
    const { type, payload } = action;
    switch (type) {
      case "TYPE":
        return { ...state, visibleType: payload };
      case "BRAND":
        return { ...state, visibleBrand: payload };
      case "DEVICE":
        return { ...state, visibleDevice: payload };
      default:
        return state;
    }
  }

  return (
    <Container className="d-flex mt-2">
      <Button
        variant="outline-dark"
        className="m-2"
        onClick={() => dispatch({ type: Kind.TYPE, payload: true })}
      >
        Add type
      </Button>
      <Button
        variant="outline-dark"
        className="m-2"
        onClick={() => dispatch({ type: Kind.BRAND, payload: true })}
      >
        Add brand
      </Button>
      <Button
        variant="outline-dark"
        className="m-2"
        onClick={() => dispatch({ type: Kind.DEVICE, payload: true })}
      >
        Add device
      </Button>
      <CreateTypeModal
        show={state.visibleType}
        handleClose={() => dispatch({ type: Kind.TYPE, payload: false })}
      />
      <CreateBrandModal
        show={state.visibleBrand}
        handleClose={() => dispatch({ type: Kind.BRAND, payload: false })}
      />
      <CreateDeviceModal
        show={state.visibleDevice}
        handleClose={() => dispatch({ type: Kind.DEVICE, payload: false })}
      />
    </Container>
  );
};

export default Admin;
