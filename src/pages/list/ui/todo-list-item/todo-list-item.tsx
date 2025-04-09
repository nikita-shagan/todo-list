"use client";

import { Todo } from "@/pages/list/model/list-slice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Typography } from "@mui/material";
import "./todo-list-item.css";

export function TodoListItem(props: {
  data: Todo;
  onClick: (todo: Todo) => void;
}) {
  return (
    <Box className="todo-list-item" onClick={() => props.onClick(props.data)}>
      <Box className="todo-list-item-icon">
        {props.data.completed ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
      </Box>
      <Typography
        className={`todo-list-item-name${props.data.completed ? " todo-list-item-name_completed" : ""}`}
      >
        {props.data.name}
      </Typography>
    </Box>
  );
}
