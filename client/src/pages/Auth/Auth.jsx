import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input.jsx";
import ForgotPassword from "./ForgotPassword";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice.js";
import * as api from "../../api/index.js";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchToSignIn = () => {
    setShowForgotPassword(false);
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const response = await api.jwtsignup(form);
        setSuccessMessage("Signup successful! Please login with the account created.");
        setIsSignup(false)
        setForm(initialState);
      } else {
        dispatch(login(form));
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle validation errors
        setError(error.response.data.errors.join(", "));
      } else {
        console.error(error);
        setError("An error occurred");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        {showForgotPassword ? (
          <ForgotPassword switchToSignIn={switchToSignIn} />
        ) : (
          <form onSubmit={handleSubmit} sx={{ width: "100%", marginTop: 3 }}>
            {isSignup && (
              <Grid container spacing={2}>
                <Input
                  name="name"
                  label="Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
              </Grid>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Button onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>

      <Dialog open={!!error} onClose={() => setError(null)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(null)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!successMessage} onClose={() => setSuccessMessage(null)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>{successMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessMessage(null)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Auth;
