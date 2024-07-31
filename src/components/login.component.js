// src/components/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitLoginRequest } from "../reducers/login.reducer";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import { selectLoggedIn } from "../selectors/login.selector";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRequiredError, setEmailRequiredError] = useState(null);
  const [passwordRequiredError, setPasswordRequiredError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailRequiredError(
      email.trim().length === 0 ? "Please enter the email." : null
    );
    setPasswordRequiredError(
      password.trim().length === 0 ? "Please enter the password." : null
    );

    dispatch(submitLoginRequest({ email, password }));
  };
  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      navigate("/suppliers");
    }
  }, [loggedIn]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "99vh",
        fontFamily: "Inter",
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 0%), 0px 3px 4px 0px rgb(0 0 0 / 5%), 0px 1px 8px 0px rgb(0 0 0 / 0%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          borderRadius: "12px",
          gap: 3,
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          height: 540,
          boxShadow:
            "0px 6px 6px -3px rgb(0 0 0 / 0%), 0px 10px 14px 1px rgb(0 0 0 / 6%), 0px 4px 18px 3px rgb(0 0 0 / 1%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            py: 2,
            px: 1,
          }}
        >
          <img src="/logo.svg" alt="Logo" style={{ width: 52, height: 49 }} />
        </Box>

        <Typography
          style={{
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "32px",
            color: "#101828",
          }}
        >
          Welcome back to
        </Typography>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "32px",
            color: "#101828",
          }}
        >
          AuditSense AI
        </Typography>
        <Typography
          style={{
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
          }}
        >
          Please enter your details to login.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailRequiredError}
            helperText={emailRequiredError}
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "8px", // Set the border-radius here
                },
              },
              "& .MuiOutlinedInput-input": {
                height: "40px", // Control the height of the input
                padding: "0 14px", // Adjust padding as needed
              },
              "& .MuiInputLabel-outlined": {
                lineHeight: "40px", // Align the label height with the input height
                transform: "translate(14px, 0px) scale(1)", // Adjust label position
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -14px) scale(0.75)", // Adjust label position when focused
              },
            }}
            InputProps={{
              style: {
                fontFamily: "Inter, sans-serif", // Set the font family for the input text
                alignItems: "center",
                fontSize: "14px",

                // Center align the text vertically
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "12px",
                maring: 0,
                padding: 0,
              },
            }}
          />
          <TextField
            label="••••••••"
            type="password"
            value={password}
            error={!!passwordRequiredError}
            helperText={passwordRequiredError}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "8px", // Set the border-radius here
                },
              },
              "& .MuiOutlinedInput-input": {
                height: "40px", // Control the height of the input
                padding: "0 14px", // Adjust padding as needed
              },
              "& .MuiInputLabel-outlined": {
                lineHeight: "40px", // Align the label height with the input height
                transform: "translate(14px, 0px) scale(1)", // Adjust label position
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -14px) scale(0.75)", // Adjust label position when focused
              },
            }}
            InputProps={{
              style: {
                fontFamily: "Inter, sans-serif", // Set the font family for the input text
                alignItems: "center",
                fontSize: "14px",

                // Center align the text vertically
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "12px",
                maring: 0,
                padding: 0,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 6,
              mb: 2,
              backgroundColor: "#3538CD",
              borderRadius: "8px",
              textTransform: "none",
              gap: "6px",
              padding: "10px 16px",

              fontSize: 16,
              fontWeight: 600,
              lineHeight: "24px",
            }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
