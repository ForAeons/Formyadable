import { useState } from "react";
import "./App.css";
import { Grid, CssBaseline } from "@mui/material";
import { Navbar, LoginModalWindow, Thread, Comment } from "./components";
import { Head, Forum, Sidebar } from "./containers";
import { useStyles } from "./style";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={6} md={4} lg={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={6} md={8} lg={9}>
          {/* <Forum /> */}
        </Grid>
      </Grid>
    </>
  );
}
