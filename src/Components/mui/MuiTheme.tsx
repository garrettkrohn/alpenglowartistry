import { createTheme } from "@mui/material/styles";

export const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#646a73",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#e0d7cb",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#1d1d1d",
    },
  },
});

export const textInputTheme = createTheme({
  palette: {
    primary: {
      main: "#e0d7cb",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#e0d7cb",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#1d1d1d",
    },
  },
});
