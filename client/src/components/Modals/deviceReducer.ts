export interface Info {
  title: string;
  description: string;
  number: number;
}
type ManyInfo = Array<Info>;

export interface DeviceStateType {
  name: string;
  price: string;
  file?: Blob;
  info: ManyInfo;
}

export enum Kind {
  SET_NAME = "SET_NAME",
  SET_PRICE = "SET_PRICE",
  SET_FILE = "SET_FILE",
  ADD_INFO = "ADD_INFO",
  UPDATE_INFO = "UPDATE_INFO",
  REMOVE_INFO = "REMOVE_INFO",
}

type PayloadType = {
  info?: Info;
  name?: string;
  price?: string;
  file?: Blob;
};

interface DeviceActionType {
  type: Kind;
  payload: PayloadType;
}

export const initialState = {
  name: "",
  price: "0",
  file: undefined,
  info: [],
};

export function deviceReducer(
  state: DeviceStateType,
  action: DeviceActionType
): DeviceStateType {
  const { type, payload } = action;

  switch (type) {
    case Kind.SET_NAME:
      if (payload.name) {
        return { ...state, name: payload.name };
      }
      return state;
    case Kind.SET_PRICE:
      if (payload.price) {
        return { ...state, price: payload.price };
      }
      return state;
    case Kind.SET_FILE:
      if (payload.file) {
        return { ...state, file: payload.file };
      }
      return state;

    case Kind.ADD_INFO:
      if (payload.info) {
        state.info.push(payload.info);
      }
      return state;

    case Kind.UPDATE_INFO:
      if (payload.info) {
        const newInfo = state.info.map((item) =>
          item.number === payload.info?.number ? payload.info : item
        );
        state.info = newInfo;
      }
      return state;

    case Kind.REMOVE_INFO:
      if (payload.info && payload.info.number) {
        const { info } = payload;
        const updatedInfo = state.info.filter(
          (item) => item.number !== info.number
        );
        state.info = updatedInfo;
      }
      return state;

    default:
      return state;
  }
}
