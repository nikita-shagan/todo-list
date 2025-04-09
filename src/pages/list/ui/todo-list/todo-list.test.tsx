import { listReducer } from "@/pages/list/model/list-slice";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { TodoList } from "./todo-list";

jest.mock("@/pages/list/api/list-api", () => ({
  addOrUpdateTodos: jest.fn().mockResolvedValue(null),
  getTodos: jest.fn().mockResolvedValue(null),
  deleteTodosByIds: jest.fn().mockResolvedValue(null),
}));

describe("TodoList (integration)", () => {
  it("Adds new task", async () => {
    const store = configureStore({
      reducer: {
        list: listReducer,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    fireEvent.change(input, { target: { value: "Test Todo Name" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Test Todo Name")).toBeInTheDocument();
    });
  });

  it("Completes task", async () => {
    const store = configureStore({
      reducer: {
        list: listReducer,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });

    const todoListItem = screen.getByText("Test Todo");
    fireEvent.click(todoListItem!);

    await waitFor(() => {
      expect(todoListItem).toHaveClass("todo-list-item-name_completed");
    });
  });

  it("Clears completed tasks", async () => {
    const store = configureStore({
      reducer: {
        list: listReducer,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    fireEvent.change(input, { target: { value: "Test Todo 1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    fireEvent.change(input, { target: { value: "Test Todo 2" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Test Todo 1"));
    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toHaveClass(
        "todo-list-item-name_completed",
      );
    });

    const clearButton = screen.getByText(/очистить/i);
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText("Test Todo 1")).toBeNull();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });
});
