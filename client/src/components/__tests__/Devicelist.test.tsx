import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialDevice } from "../../types/device";
import DeviceList from "../DeviceList";

const mockedUsedSelector = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

type InitialState = Pick<InitialDevice, "devices">;

const mockDevice = {
  id: 1,
  name: "P2422H",
  price: 200,
  rating: 0,
  info: [],
  img: "71456202-4801-4a73-953e-dd028a926fda.jpg",
  brandId: 1,
  typeId: 1,
};

const stateOne: InitialState = {
  devices: [],
};
const stateTwo: InitialState = {
  devices: [mockDevice],
};

function createDeviceSlice(state: InitialState) {
  return createSlice({
    name: "device",
    initialState: state,
    reducers: {},
  });
}

describe("test DeviceList component", () => {
  afterEach(() => {
    mockedUsedSelector.mockClear();
    cleanup();
  });

  test("renders correctly when there are no devices", () => {
    const mockStore = configureStore({
      reducer: { device: createDeviceSlice(stateOne).reducer },
    });
    render(
      <Provider store={mockStore}>
        <DeviceList />
      </Provider>
    );
    const noData = screen.queryByText("No Data");
    expect(noData).toBeInTheDocument();
  });

  test("renders correctly when there are devices", () => {
    const mockStore = configureStore({
      reducer: { device: createDeviceSlice(stateTwo).reducer },
    });
    render(
      <Provider store={mockStore}>
        <DeviceList />
      </Provider>
    );
    const deviceItems = screen.getAllByRole("button");
    deviceItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
