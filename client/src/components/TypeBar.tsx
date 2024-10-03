import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getSelectedType,
  setSelectedType,
} from "../store/slices/typeSlice";

const TypeBar: FC = () => {
  const types = useSelector(getTypes);
  const selectedType = useSelector(getSelectedType);
  const dispatch = useDispatch();

  return (
    <>
      <h5>filter by type</h5>
      <ListGroup role="list">
        {types.map((item) => (
          <ListGroup.Item
            key={item.id}
            active={item.id === selectedType.id}
            onClick={() => dispatch(setSelectedType(item))}
            style={{ cursor: "pointer" }}
            role="listitem"
          >
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TypeBar;
