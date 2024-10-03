import { cleanup, render, screen } from "@testing-library/react";
import ExpandableText from "../../temporal/ExpandableText";
import { mockLongText, mockShortText } from "../../../mock";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

describe("test ExpandableText component", () => {
  test("given text is shorter then limit", () => {
    render(<ExpandableText text={mockShortText} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(mockShortText);
  });

  test("given text is larger then limit", async () => {
    userEvent.setup();
    render(<ExpandableText text={mockLongText} />);

    const button = screen.getByRole("button");
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent("...");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);

    await userEvent.click(button);
    expect(button).toHaveTextContent(/less/i);
    expect(article).not.toHaveTextContent("...");
  });
});
