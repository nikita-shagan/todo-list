"use client";

import { TodoList } from "@/pages/list/ui/todo-list/todo-list";
import { Box } from "@mui/material";
import "./list-page.css";

export function ListPage() {
  return (
    <Box className="list-page">
      <Box component="h1" className="list-page-title">
        Список дел
      </Box>
      <TodoList />
    </Box>
  );
}
