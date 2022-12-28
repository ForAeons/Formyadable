import React, { useState } from "react";
import { Navbar, Sidebar, MainBody } from "./components";
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
  const [login, setLogin] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="flexbox-container">
        <nav className="flexbox-item navbar">
          <Navbar login={login} setLogin={setLogin} />
        </nav>
        <aside className="flexbox-item sidebar">
          <Sidebar />
        </aside>
        <main className="flexbox-item main-body">
          <MainBody />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
