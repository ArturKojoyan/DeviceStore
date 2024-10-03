import { render, screen } from "@testing-library/react";
import DeviceItem from "../DeviceItem";
import userEvent from "@testing-library/user-event";

const device = {
  id: 1,
  name: "P2422H",
  price: 200,
  rating: 0,
  img: "71456202-4801-4a73-953e-dd028a926fda.jpg",
  info: [],
  brandId: 1,
  typeId: 1,
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("test DeviceItem component", () => {
  test("device item renders correctly", () => {
    render(<DeviceItem device={device} />);

    const image = screen.getByRole("img", { name: "device image" });
    const deviceName = screen.queryByText(device.name);
    expect(image).toHaveAttribute("src", `http://localhost:3003/${device.img}`);
    expect(deviceName).toBeInTheDocument();
  });

  test("navigation works correctly", async () => {
    userEvent.setup();
    render(<DeviceItem device={device} />);

    const container = screen.getByRole("button");

    await userEvent.click(container);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(mockedUsedNavigate).toBeCalledWith(`/device/${device.id}`);
  });
});
