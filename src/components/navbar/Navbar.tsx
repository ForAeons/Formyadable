import React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { Button, Box, Typography, Modal } from "@mui/material";
import "./Navbar.css";

interface Props {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar: React.FC<Props> = ({ login, setLogin }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    setLogin(!login);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <ForumIcon />
      </div>
      <h1>FORMYDABLE</h1>
      <Button
        className="login-btn"
        variant="contained"
        startIcon={login ? <AccountCircleIcon /> : <NoAccountsIcon />}
        color="secondary"
        onClick={handleOpen}
      >
        {login ? "Logged In" : "Login"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
