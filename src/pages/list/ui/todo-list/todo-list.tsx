"use client";

import {
  addTodo,
  clearCompletedTodos,
  fetchTodos,
  Todo,
  toggleTodo,
} from "@/pages/list/model/list-slice";
import { TodoListItem } from "@/pages/list/ui/todo-list-item/todo-list-item";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import {
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./todo-list.css";

export function TodoList() {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.list);
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [tab, setTab] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    if (tab === "all") {
      setFilteredTodos(todos);
    } else if (tab === "active") {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (tab === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    }
  }, [tab, todos]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Box className="todo-list">
      <FormControl>
        <TextField
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTodoName) {
              dispatch(addTodo(newTodoName));
              setNewTodoName("");
            }
          }}
          id="my-input"
          aria-describedby="my-helper-text"
          variant="outlined"
          placeholder="Что нужно сделать?"
          required
        />
      </FormControl>
      <List className="todo-list-list">
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id} className="todo-list-list-item">
            <TodoListItem
              data={todo}
              onClick={(todo) => dispatch(toggleTodo(todo))}
            />
          </ListItem>
        ))}
      </List>
      <Box className="todo-list-footer">
        <Box className="todo-list-footer-remained">
          Осталось:{" "}
          {todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0)}
        </Box>
        <Box className="todo-list-footer-controls">
          <Button
            className="todo-list-footer-controls-button"
            variant={tab === "all" ? "outlined" : "text"}
            onClick={() => setTab("all")}
          >
            Все
          </Button>
          <Button
            className="todo-list-footer-controls-button"
            variant={tab === "active" ? "outlined" : "text"}
            onClick={() => setTab("active")}
          >
            Активные
          </Button>
          <Button
            className="todo-list-footer-controls-button"
            variant={tab === "completed" ? "outlined" : "text"}
            onClick={() => setTab("completed")}
          >
            Завершенные
          </Button>
        </Box>
        <Button
          className="todo-list-footer-button"
          variant="outlined"
          color="error"
          onClick={() =>
            dispatch(
              clearCompletedTodos(todos.filter((todo) => todo.completed)),
            )
          }
        >
          Очистить
        </Button>
      </Box>
    </Box>
  );
}
