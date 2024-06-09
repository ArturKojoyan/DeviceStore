import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { createType, deleteType } from "../../axios/deviceApi";
import { removeType, updateTypes } from "../../store/slices/typeSlice";

const { Body, Header, Footer, Title } = Modal;

interface PROPS {
  show: boolean;
  handleClose: () => void;
}

const CreateType: FC<PROPS> = ({ show, handleClose }) => {
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const addType = async () => {
    if (!type) {
      return alert("type is empty");
    }

    const newType = await createType(type);
    dispatch(updateTypes(newType));
    handleClose();
  };

  const terminateType = async () => {
    if (!type) {
      return alert("type is empty");
    }

    const resp = await deleteType(type);
    if (resp.success) {
      dispatch(removeType(type));
      handleClose();
    } else {
      alert(resp.message);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Header closeButton>
          <Title>Add new type</Title>
        </Header>
        <Body>
          <Form>
            <Form.Control
              placeholder="Input new type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form>
        </Body>
        <Footer className="d-flex justify-content-between">
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <div>
            <Button
              variant="outline-success"
              onClick={addType}
              className="me-2"
            >
              Add
            </Button>
            <Button variant="outline-danger" onClick={terminateType}>
              Delete
            </Button>
          </div>
        </Footer>
      </Modal>
    </div>
  );
};

export default CreateType;
