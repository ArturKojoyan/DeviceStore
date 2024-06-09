import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getSelectedBrand,
  setSelectedBrand,
} from "../store/slices/brandSlice";

const BrandBar: FC = () => {
  const brands = useSelector(getBrands);
  const selectedBrand = useSelector(getSelectedBrand);
  const dispatch = useDispatch();

  return (
    <>
      <h5 className="mt-2">filter by brand</h5>
      <ListGroup>
        {brands.map((item) => (
          <ListGroup.Item
            key={item.id}
            active={item.id === selectedBrand.id}
            onClick={() => dispatch(setSelectedBrand(item))}
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>

    // <Row className="d-flex">
    //   {brands.map((item) => (
    //     <Card
    //       key={item.id}
    //       className="p-3"
    //       style={{ cursor: "pointer" }}
    //       onClick={() => dispatch(setSelectedBrand(item))}
    //       border={item.id === selectedBrand.id ? "danger" : "light"}
    //     >
    //       {item.name}
    //     </Card>
    //   ))}
    // </Row>
  );
};

export default BrandBar;
