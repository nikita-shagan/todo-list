"use client";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material/styles";
import { ReactNode, useRef } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeRef = useRef<Theme | null>(null);
  if (!themeRef.current) {
    themeRef.current = createTheme({
      palette: {
        mode: "dark",
      },
    });
  }
  console.log(themeRef.current);
  return (
    <MuiThemeProvider theme={themeRef.current}>{children}</MuiThemeProvider>
  );
}
