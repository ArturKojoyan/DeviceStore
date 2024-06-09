import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentDevice,
  setCurrentDevice,
} from "../store/slices/deviceSlice";
import { fetchDevice } from "../axios/deviceApi";
import bigStar from "../assets/bigStar.png";

const Device: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentDevice = useSelector(getCurrentDevice);
  console.log("🚀 ~ currentDevice:", currentDevice);

  useEffect(() => {
    if (id) {
      fetchDevice(id).then((device) => {
        dispatch(setCurrentDevice(device));
      });
    }
  }, [dispatch, id]);

  if (!currentDevice.id) {
    return <></>;
  }

  return (
    <Container className="mt-2">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={"http://localhost:3003/" + currentDevice.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{currentDevice.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
              }}
            >
              {currentDevice.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex=column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>from {currentDevice.price} USD</h3>
            <Button variant="outline-dark">Add to Cart</Button>
          </Card>
        </Col>
      </Row>
      {currentDevice.info.length > 0 && (
        <div className="d-flex flex-column m-3">
          <h3>Device Info</h3>
          {currentDevice.info.map((item, index) => (
            <Row
              key={item.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 16,
              }}
            >
              {item.title}: {item.description}
            </Row>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Device;
