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

import * as api from '../../api/index.js'

const ForgotPassword = ({ switchToSignIn }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await api.resetpassword(email)
    alert(`reset password mail sent to ${email} with instructions`);
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
          Forgot Password
        </Typography>
        <form onSubmit={handleForgotPassword} sx={{ width: "100%", marginTop: 3 }}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              type="email"
              autoFocus
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
          >
            Reset Password
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component="button" variant="body2" onClick={switchToSignIn}>
              Back to Sign In
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
