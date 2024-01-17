import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input.jsx"; // Import your Input component here
import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component

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

  const switchToSignIn = () => {
    setShowForgotPassword(false);
    // Additional logic if needed when switching to sign-in mode
  };

  const handleShowPassword = () => setShowPassword((pre) => !pre);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (isSignup) {
      // Add signup logic here
    } else {
      // Add login logic here
    }
    // Additional logic if needed after submission
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
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
                  label="name"
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
    </Container>
  );
};

export default Auth;
