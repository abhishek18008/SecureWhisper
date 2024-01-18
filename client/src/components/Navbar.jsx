
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whisper from '../images/whisper.svg'
import { logout } from "../features/authSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.authData.token ?true :false);

  useEffect(() => {
    console.log('Navbar rerendered');
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
      }}
      position="static"
      color="inherit"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component={Link}
          to="/"
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
          variant="h2"
          align="center"
        >
          SecureWhisper
        </Typography>
        <img
          style={{ marginLeft: "15px" }}
          src={whisper}
          alt="icon"
          height="60"
        />
      </div>
      <Toolbar>
        {isAuthenticated ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              style={{ display: "flex", alignItems: "center" }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
