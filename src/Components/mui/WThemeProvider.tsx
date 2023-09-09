import React from "react";
import { CssBaseline } from "@mui/material";
import ThemeProvider, {
  ThemeProviderProps,
} from "@mui/material/styles/ThemeProvider";

export interface WThemeProviderProps extends ThemeProviderProps {}

export const WThemeProvider = ({ children, ...rest }: WThemeProviderProps) => {
  return (
    <ThemeProvider {...rest}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
