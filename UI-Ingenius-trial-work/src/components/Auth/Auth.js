import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InputAdornment,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ToastContext from "../Context/ToastContext";
import { login, register } from "../redux/slices/authSlice"; 
import { fetchProfile, updateProfile } from "../redux/slices/profileSlice";

const LoginButton = styled(Button)`
  text-transform: none;
  height: 40px;
  box-shadow: 5px 5px 5px gray;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  bordor-radius: 2px;
  height: 40px;
  background: #f2f2f2;
  box-shadow: 5px 5px 5px gray;
`;

function Auth({ isUserAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, toggleAccount] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useContext(ToastContext);
  const { loading, error, data: profileData } = useSelector((state) => state.profile);

  const [userPayload, setUserPayload] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch, account]);

  useEffect(() => {
    if (profileData) {
      setUserPayload(profileData); 
    }
  }, [profileData]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserPayload((values) => ({ ...values, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const res = await dispatch(register(userPayload)).unwrap();
      toast.success(res?.message || "Sign up successful!");
      toggleSignup();
    } catch (error) {
      toast.error(error.message || "Sign up failed. Please enter valid data.");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await dispatch(login({ email, password })).unwrap();
      toast.success(res?.message || "Login successful!");
      navigate('/home')
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please enter valid email and password."
      );
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await dispatch(updateProfile(userPayload)).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
      toggleSignup()
    } catch (error) {
      toast.error(
        error.message || "Failed to update profile. Please enter valid data."
      );
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "rgb(42 43 42)",
      }}
    >
      <div
        className="form_center"
        style={{
          display: "grid",
          background: "white",
          padding: "2rem",
          boxShadow: "3px 5px 19px 6px #4d454536",
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontSize: "1.2rem",
            paddingBottom: "1rem",
            fontWeight: "600",
            margin: "auto",
          }}
        >
          {account === "login" ? "Login" : "Sign Up / Update Profile"}
        </Typography>

        {account === "login" ? (
          <>
            <TextField
              mb={2}
              fullWidth
              id="outlined-controlled"
              style={{
                marginBottom: "2rem",
                width: "300px",
              }}
              label="Email Address"
              placeholder="Email Address"
              variant="standard"
              value={email}
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              mb={2}
              fullWidth
              id="outlined-controlled"
              style={{
                marginBottom: "2rem",
                width: "300px",
              }}
              label="Password"
              placeholder="Password"
              variant="standard"
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton variant="contained" onClick={handleLogin}>
              Login
            </LoginButton>
            <Typography
              style={{
                margin: "1rem auto",
                fontWeight: "bold",
              }}
            >
              OR
            </Typography>
            <SignupButton onClick={toggleSignup} variant="text">
              Create an account
            </SignupButton>
          </>
        ) : (
          <>
            <TextField
              mb={2}
              fullWidth
              id="outlined-controlled"
              style={{
                marginBottom: "2rem",
                width: "300px",
              }}
              label="User Name"
              placeholder="User Name"
              variant="standard"
              name="username"
              value={userPayload.username || ""}
              onChange={handleChange}
            />
            <TextField
              mb={2}
              fullWidth
              id="outlined-controlled"
              style={{
                marginBottom: "2rem",
                width: "300px",
              }}
              label="Email Address"
              placeholder="Email Address"
              variant="standard"
              name="email"
              type="email"
              value={userPayload.email || ""}
              onChange={handleChange}
            />
            <TextField
              mb={2}
              fullWidth
              id="outlined-controlled"
              style={{
                marginBottom: "2rem",
                width: "300px",
              }}
              label="Password"
              placeholder="Password"
              variant="standard"
              name="password"
              type="password"
              value={userPayload.password || ""}
              onChange={handleChange}
            />
            <SignupButton onClick={handleSignUp}>Sign Up</SignupButton>
            <Typography
              style={{
                margin: "1rem auto",
                fontWeight: "bold",
              }}
            >
              OR
            </Typography>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </>
        )}

        {account !== "login" && (
          <LoginButton
            onClick={handleUpdateProfile}
            variant="contained"
            style={{ marginTop: "1rem" }}
          >
            Update Profile
          </LoginButton>
        )}
      </div>
    </div>
  );
}

export default Auth;
