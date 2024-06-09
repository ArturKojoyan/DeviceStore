import { FunctionComponent as FC } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Device_ROUTE } from "../utils";
import { Device } from "../store/slices/deviceSlice";
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
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image
          width={150}
          height={150}
          src={"http://localhost:3003/" + device.img}
        />
        <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
          <div>{device.name}</div>
          <div className="d-flex align-items-center align-items-center">
            <div>{device.rating}</div>
            <Image width={15} height={15} src={star} />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
