import { FC, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import {
  getSelectedType,
  getTypes,
  setSelectedType,
} from "../../store/slices/typeSlice";
import {
  getBrands,
  getSelectedBrand,
  setSelectedBrand,
} from "../../store/slices/brandSlice";
import { useCreateDeviceMutation } from "../../store/services/DeviceService";
import {
  DeviceStateType,
  Info,
  Kind,
  deviceReducer,
  initialState,
} from "./deviceReducer";

const { Body, Header, Footer, Title } = Modal;

interface PROPS {
  show: boolean;
  handleClose: () => void;
}

const CreateDevice: FC<PROPS> = ({ show, handleClose }) => {
  const types = useSelector(getTypes);
  const brands = useSelector(getBrands);
  const [deviceState, setDeviceState] = useReducer(deviceReducer, initialState);
  const dispatch = useDispatch();
  const selectedBrand = useSelector(getSelectedBrand);
  const selectedType = useSelector(getSelectedType);
  const [createDevice, { data }] = useCreateDeviceMutation();
  console.log("🚀 ~ data:", data);

  const addInfo = () => {
    setDeviceState({
      type: Kind.ADD_INFO,
      payload: { info: { title: "", description: "", number: Date.now() } },
    });
  };

  const updateInfo = (key: string, value: string, info: Info) => {
    info[key] = value;
    setDeviceState({
      type: Kind.UPDATE_INFO,
      payload: { info },
    });
  };

  const removeInfo = (info: Info) => {
    setDeviceState({
      type: Kind.REMOVE_INFO,
      payload: { info },
    });
  };

  const addDevice = async (deviceState: DeviceStateType) => {
    console.log(deviceState, "deviceState");
    const formData = new FormData();
    formData.append("name", deviceState.name);
    formData.append("price", deviceState.price);
    if (deviceState.file) {
      formData.append("img", deviceState.file);
    }
    formData.append("typeId", String(selectedType.id));
    formData.append("brandId", String(selectedBrand.id));
    formData.append("info", JSON.stringify(deviceState.info));

    await createDevice(formData);
    handleClose();
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Header closeButton>
          <Title>Add new device</Title>
        </Header>
        <Form>
          <Body>
            <div className="d-flex">
              <Dropdown className="me-2">
                <Dropdown.Toggle>
                  {selectedType.name || "Select type"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {types.map((type) => (
                    <Dropdown.Item
                      key={type.id}
                      onClick={() => dispatch(setSelectedType(type))}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="me-2">
                <Dropdown.Toggle>
                  {selectedBrand.name || "Select brand"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {brands.map((brand) => (
                    <Dropdown.Item
                      key={brand.id}
                      onClick={() => dispatch(setSelectedBrand(brand))}
                    >
                      {brand.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form.Group controlId="name">
              <Form.Control
                placeholder="name..."
                value={deviceState.name}
                className="mt-3"
                onChange={(e) =>
                  setDeviceState({
                    type: Kind.SET_NAME,
                    payload: { name: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Control
                type="number"
                placeholder="price..."
                value={deviceState.price}
                className="mt-3"
                onChange={(e) =>
                  setDeviceState({
                    type: Kind.SET_PRICE,
                    payload: { price: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Control
                type="file"
                placeholder="image..."
                className="mt-3"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeviceState({
                    type: Kind.SET_FILE,
                    payload: { file: e.target.files?.[0] },
                  })
                }
              />
            </Form.Group>
            <Button variant="outline-dark" onClick={addInfo} className="mt-3">
              Add new info
            </Button>

            {deviceState.info.map((item) => (
              <Row className="mt-3" key={item.number}>
                <Col md={4}>
                  <Form.Control
                    placeholder="title..."
                    value={item.title}
                    onChange={(e) => updateInfo("title", e.target.value, item)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="description..."
                    value={item.description}
                    onChange={(e) =>
                      updateInfo("description", e.target.value, item)
                    }
                  />
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeInfo(item)}
                  >
                    delete info
                  </Button>
                </Col>
              </Row>
            ))}
          </Body>
          <Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="outline-success"
              onClick={() => addDevice(deviceState)}
            >
              Add device
            </Button>
          </Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateDevice;
