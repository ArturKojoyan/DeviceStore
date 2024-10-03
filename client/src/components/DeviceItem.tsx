import { FC } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Device_ROUTE } from "../utils";
import type { Device } from "../types/device";
import star from "../assets/star.png";

interface PropsType {
  device: Device;
}

const DeviceItem: FC<PropsType> = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(Device_ROUTE + "/" + device.id)}
      role="button"
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
          alt="device image"
        />
        <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
          <div>{device.name}</div>
          <div className="d-flex align-items-center align-items-center">
            <div>{device.rating}</div>
            <Image width={15} height={15} src={star} alt="star" />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
