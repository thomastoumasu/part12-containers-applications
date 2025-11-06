import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("<Todo />", () => {
  let deleteMockHandler = vi.fn();
  let completeMockHandler = vi.fn();

  const todo = {
    text: "drink coffee",
    done: false,
  };

  beforeEach(() => {
    render(<Todo todo={todo} deleteTodo={deleteMockHandler} completeTodo={completeMockHandler} />);
  });

  test("renders content and is not done by default", async () => {
    // test rendering of text
    const textRendered = screen.getByText(todo.text, { exact: false }); // exact: otherwise do not pickup when text and other things next to each other
    const setAsDoneRendered = await screen.findByText("Set as done", { exact: false }); // same effect as getByText but async
    const notDoneRendered = await screen.findByText("This todo is not done", { exact: false });
    const doneRendered = screen.queryByText("This todo is done", { exact: false });
    expect(textRendered).toBeDefined();
    expect(setAsDoneRendered).toBeDefined();
    expect(notDoneRendered).toBeDefined();
    expect(doneRendered).toBeNull();

    // screen.debug() // to debug
    // screen.debug(titleRendered)
  });

  test("sets to done button can be clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Set as done");
    await user.click(button);
    expect(completeMockHandler.mock.calls).toHaveLength(1);
  });

  test("delete button can be clicked", async () => {
    const user = userEvent.setup();
    const viewDetailsButton = screen.getByText("Delete");
    await user.click(viewDetailsButton);
    expect(deleteMockHandler.mock.calls).toHaveLength(1);
  });
});
