import { cleanup, render, screen } from "@testing-library/react";
import Todo from "../../temporal/Todo";

afterEach(() => {
  cleanup();
});

describe("Todo component", () => {
  test("rendering completed todo", () => {
    const todo = { id: 1, title: "learn jest", completed: true };
    render(<Todo todo={todo} />);
    // const todoElem = screen.getByTestId("todo-1");
    const todoElem = screen.getByRole("listitem");
    expect(todoElem).toHaveTextContent(todo.title);
    expect(todoElem).toContainHTML(`<li><i><h4>${todo.title}</h4></i></li>`);
  });

  test("rendering non-completed todo", () => {
    const todo = { id: 2, title: "watch movie", completed: false };
    render(<Todo todo={todo} />);
    // const todoElem = screen.getByTestId("todo-2");
    const todoElem = screen.getByRole("listitem");
    expect(todoElem).toHaveTextContent(todo.title);
    expect(todoElem).toContainHTML(`<li><h4>${todo.title}</h4></li>`);
  });
});
