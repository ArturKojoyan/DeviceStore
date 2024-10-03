import { render, screen, cleanup } from "@testing-library/react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import TypeBar from "../TypeBar";
import type { DeviceType, InitialDeviceType } from "../../types/deviceType";
import type { EmptyObj } from "../../types/common";
import { setSelectedType } from "../../store/slices/typeSlice";

const mockedUsedDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedUsedDispatch,
}));

const initialOne: InitialDeviceType = {
  types: [
    { id: 1, name: "monitors" },
    { id: 2, name: "smartphones" },
  ],
  selectedType: {},
};

const initialTwo: InitialDeviceType = {
  types: [],
  selectedType: {},
};

function makeSlice(initialState: InitialDeviceType) {
  return createSlice({
    name: "type",
    initialState,
    reducers: {
      setSelectedType: (
        currentState,
        action: PayloadAction<DeviceType | EmptyObj>
      ) => {
        currentState.selectedType = action.payload;
      },
    },
  });
}

describe("test TypeBar component", () => {
  afterEach(() => {
    cleanup();
  });

  test("render list of types", () => {
    const mockStore = configureStore({
      reducer: { type: makeSlice(initialOne).reducer },
    });
    render(
      <Provider store={mockStore}>
        <TypeBar />
      </Provider>
    );
    const heading = screen.getByRole("heading");
    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(heading).toHaveTextContent(/filter by type/i);
    listItems.forEach((item) => {
      expect(list).toContainElement(item);
    });
  });

  test("render no list of types", () => {
    const mockStore = configureStore({
      reducer: { type: makeSlice(initialTwo).reducer },
    });
    render(
      <Provider store={mockStore}>
        <TypeBar />
      </Provider>
    );

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("check list onClick functionality", () => {
    userEvent.setup();
    const mockStore = configureStore({
      reducer: { type: makeSlice(initialOne).reducer },
    });
    render(
      <Provider store={mockStore}>
        <TypeBar />
      </Provider>
    );
    const listItems = screen.getAllByRole("listitem");

    listItems.forEach(async (item, i) => {
      await userEvent.click(listItems[i]);
      expect(listItems[i]).toHaveClass("active");
      expect(mockedUsedDispatch).toBeCalledTimes(1);
      expect(mockedUsedDispatch).toBeCalledWith(
        setSelectedType(initialOne.types[i])
      );
    });
  });
});
