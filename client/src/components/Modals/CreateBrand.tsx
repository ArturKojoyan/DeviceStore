import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand, deleteBrand } from "../../axios/deviceApi";
import { removeBrand, updateBrands } from "../../store/slices/brandSlice";

const { Body, Header, Footer, Title } = Modal;

interface PROPS {
  show: boolean;
  handleClose: () => void;
}

const CreateBrand: FC<PROPS> = ({ show, handleClose }) => {
  const [brand, setBrand] = useState("");
  const dispatch = useDispatch();

  const addBrand = async () => {
    if (!brand) {
      return alert("type is empty");
    }

    const newBrand = await createBrand(brand);
    dispatch(updateBrands(newBrand));
    handleClose();
  };

  const terminateBrand = async () => {
    if (!brand) {
      return alert("type is empty");
    }

    const resp = await deleteBrand(brand);
    if (resp.success) {
      dispatch(removeBrand(brand));
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
          <Title>Add new brand</Title>
        </Header>
        <Body>
          <Form>
            <Form.Control
              placeholder="Input new brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form>
        </Body>
        <Footer className="d-flex justify-content-between">
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <div>
            <Button variant="outline-success" onClick={addBrand} className="me-2">
              Add
            </Button>
            <Button variant="outline-danger" onClick={terminateBrand}>
              Delete
            </Button>
          </div>
        </Footer>
      </Modal>
    </div>
  );
};

export default CreateBrand;
