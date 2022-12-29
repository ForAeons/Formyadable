import React from "react";
import { useNavigate } from "react-router-dom";
import { Forum, AccountCircle, NoAccounts } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./Navbar.css";

interface Props {
  jwtToken: string;
}

const Navbar: React.FC<Props> = ({ jwtToken }) => {
  const navigator = useNavigate();

  return (
    <div className="navbar">
      <div className="logo">
        <Forum />
      </div>
      <h1>JUST A FORUM</h1>
      <Button
        className="login-btn"
        variant="contained"
        startIcon={jwtToken ? <AccountCircle /> : <NoAccounts />}
        color="secondary"
        onClick={() => navigator("/login")}
      >
        {jwtToken ? "Logged In" : "Login"}
      </Button>
    </div>
  );
};

export default Navbar;
