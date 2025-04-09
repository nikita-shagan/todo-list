"use client";

import { Box, FormControl, TextField } from "@mui/material";
import "./todo-list.css";

export function TodoList() {
  return (
    <Box className="todo-list">
      <FormControl>
        <TextField
          id="my-input"
          aria-describedby="my-helper-text"
          variant="outlined"
          placeholder="What&#39;s need to be done?"
        />
      </FormControl>
    </Box>
  );
}
