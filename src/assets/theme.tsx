import { PaletteColorOptions } from "@mui/material/styles/createPalette";
import createTheme from "@mui/material/styles/createTheme";

export const primary: PaletteColorOptions = {
  main: "#000",
  light: "#000",
  dark: "#000",
  contrastText: "#fff"
};

export const secondary: PaletteColorOptions = {
  main: "#000",
  // light: "#8b95d8",
  // dark: "#8b95d8",
  contrastText: "#fff"
};

const theme = createTheme({
  palette: {
    primary,
    secondary
  }
});

export default theme;
