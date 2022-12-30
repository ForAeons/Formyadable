import React, { useState } from "react";
import { Navbar, Sidebar, Alert } from "./components";
import { Outlet } from "react-router-dom";
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

  return (
    <ThemeProvider theme={theme}>
      <div className="flexbox-container">
        <nav className="flexbox-item navbar">
          <Navbar jwtToken={jwtToken} />
        </nav>
        <aside className="flexbox-item sidebar">
          <Sidebar jwtToken={jwtToken} setJwtToken={setJwtToken} />
        </aside>
        <div className="flexbox-item main-body">
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
      </div>
    </ThemeProvider>
  );
};

export default App;
