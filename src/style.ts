import { makeStyles } from "@mui/material";
import { ThemeProvider, createTheme, ThemeCssVar } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2ec4b6",
      light: "#cbf3f0",
      dark: "#1e2124",
    },
    secondary: {
      main: "#ff8600",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
  },
});

export { theme };
