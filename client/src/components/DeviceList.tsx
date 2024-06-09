import { FunctionComponent as FC } from "react";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { useSelector } from "react-redux";
import { getDevices } from "../store/slices/deviceSlice";

const DeviceList: FC = () => {
  const devices = useSelector(getDevices);

  if (devices.length === 0) {
    return <p>No Data</p>
  }
    return (
      <Row className="d-flex">
        {devices.map((device: any) => (
          <DeviceItem key={device.id} device={device} />
        ))}
      </Row>
    );
};

export default DeviceList;
