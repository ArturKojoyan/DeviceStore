import { FC, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { getUserSelector } from "../store/slices/userSlice";
import { fetchDevices } from "../axios/deviceApi";
import {
  getLimit,
  getPage,
  setDevices,
  setTotalCount,
} from "../store/slices/deviceSlice";
import { getSelectedType } from "../store/slices/typeSlice";
import { getSelectedBrand } from "../store/slices/brandSlice";

const Shop: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserSelector);
  console.log("🚀 ~ Shop ~ currentUser:", currentUser);
  const limit = useSelector(getLimit);
  const currentPage = useSelector(getPage);
  const selectedType = useSelector(getSelectedType);
  const selectedBrand = useSelector(getSelectedBrand);

  useEffect(() => {
    fetchDevices(selectedType.id, selectedBrand.id, currentPage, limit).then(
      (data) => {
        dispatch(setDevices(data.rows));
        dispatch(setTotalCount(data.count));
      }
    );
  }, [selectedType.id, selectedBrand.id, currentPage, limit, dispatch]);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
          <BrandBar />
        </Col>
        <Col md={9}>
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
