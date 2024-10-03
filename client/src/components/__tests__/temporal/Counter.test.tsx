import { render, screen } from "@testing-library/react";
import Counter from "../../temporal/Counter";
import userEvent from "@testing-library/user-event";

function renderComponent() {
  render(<Counter />);
  const count = screen.getByRole("heading");
  const incButton = screen.getByRole("button", { name: "Increment" });
  const amount = screen.getByRole("spinbutton");
  const setButton = screen.getByRole("button", { name: "Set" });
  
  return { count, incButton, amount, setButton };
}

describe("Count Component", () => {
  test("renders correctly", () => {
    const { count, incButton } = renderComponent();

    expect(count).toBeInTheDocument();
    expect(incButton).toBeInTheDocument();
  });

  test("initial count is 0", () => {
    const { count } = renderComponent();
    expect(count).toHaveTextContent("0");
  });

  test("render count of 1 after increment button clicked", async () => {
    userEvent.setup();
    const { count, incButton } = renderComponent();
    await userEvent.click(incButton);
    expect(count).toHaveTextContent("1");
  });

  test("render a count of 10 after Set button clicked", async () => {
    userEvent.setup();
    const { count, amount, setButton } = renderComponent();
    await userEvent.type(amount, "10");
    await userEvent.click(setButton);

    expect(amount).toHaveValue(10);
    expect(count).toHaveTextContent("10");
  });

  test("elements to have focus on right order", async () => {
    userEvent.setup();
    const { amount, incButton, setButton } = renderComponent();

    await userEvent.tab();
    expect(incButton).toHaveFocus();

    await userEvent.tab();
    expect(amount).toHaveFocus();

    await userEvent.tab();
    expect(setButton).toHaveFocus();
  });
});
