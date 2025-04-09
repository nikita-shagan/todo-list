import {
  addOrUpdateTodos,
  deleteTodosByIds,
  getTodos,
} from "@/pages/list/api/list-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
};

interface ListState {
  todos: Todo[];
}

const initialState: ListState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk<Todo[] | null>(
  "fetchTodos",
  async () => {
    try {
      return await getTodos();
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const addTodo = createAsyncThunk<Todo | null, string>(
  "addTodo",
  async (name) => {
    try {
      const newTodo = {
        id: crypto.randomUUID(),
        name,
        completed: false,
      };
      await addOrUpdateTodos([newTodo]);
      return newTodo;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const toggleTodo = createAsyncThunk<Todo | null, Todo>(
  "toggleTodo",
  async (todo) => {
    try {
      const toggledTodo = { ...todo, completed: !todo.completed };
      await addOrUpdateTodos([toggledTodo]);
      return toggledTodo;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const clearCompletedTodos = createAsyncThunk<string[] | null, Todo[]>(
  "clearCompletedTodos",
  async (todos) => {
    try {
      const todoIdsToClear = todos.map((todo) => todo.id);
      await deleteTodosByIds(todoIdsToClear);
      return todoIdsToClear;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      if (action.payload) {
        state.todos = action.payload;
      }
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      if (action.payload) {
        state.todos.push(action.payload);
      }
    });
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const toggledTodo = action.payload;
      if (toggledTodo) {
        state.todos = state.todos.map((todo) => {
          if (todo.id === toggledTodo.id) {
            return { ...todo, completed: toggledTodo.completed };
          }
          return todo;
        });
      }
    });
    builder.addCase(clearCompletedTodos.fulfilled, (state, action) => {
      if (action.payload) {
        const clearedTodosIdsSet = new Set<string>(action.payload);
        state.todos = state.todos.filter(
          (todo) => !clearedTodosIdsSet.has(todo.id),
        );
      }
    });
  },
});

export const listReducer = listSlice.reducer;
