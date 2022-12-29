import React, { useState } from "react";
import { Navbar, Sidebar, Login, Alert } from "./components";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4dccbd",
    },
    secondary: {
      main: "#d6fff6",
    },
  },
});

const App: React.FC = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [display, setDisplay] = useState(false);

  const navigator = useNavigate();

  const logOut = (): void => {
    setJwtToken("");
    navigator("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flexbox-container">
        <nav className="flexbox-item navbar">
          <Navbar jwtToken={jwtToken} />
        </nav>
        <aside className="flexbox-item sidebar">
          <Sidebar />
        </aside>
        <Alert message={alertMessage} display={display} />
        <Outlet
          context={{
            jwtToken,
            setJwtToken,
            setAlertMessage,
            setDisplay,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
