import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../components/Context/ToastContext";
import {
  fetchProfile,
  updateProfile,
} from "../components/redux/slices/profileSlice";
import CancelModal from "./CancelModal";
import { cancelSubscription } from "./redux/slices/subscriptionSlice";
import TopTabs from "./TopTabs";

const UpdateButton = styled(Button)`
  text-transform: none;
  height: 40px;
  box-shadow: 5px 5px 5px gray;
  background: red;
`;

const CancelButton = styled(Button)`
  text-transform: none;
  height: 40px;
  box-shadow: 5px 5px 5px gray;
`;

const UpdateProfile = styled(Button)`
  text-transform: none;
  height: 40px;
  box-shadow: 5px 5px 5px gray;
  background: green;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  bordor-radius: 2px;
  height: 40px;
  background: #f2f2f2;
  box-shadow: 5px 5px 5px gray;
`;

function MyProfile() {
  const [account, toggleAccount] = useState("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useContext(ToastContext);
  const { data: profileData } = useSelector((state) => state.profile);
  const [userPayload, setUserPayload] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancelSubscription = () => {
    dispatch(cancelSubscription({ userId: 2 }));
    handleClose();
    toast.success("Subscription plan cancelled successfully!");
  };

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

  const handleUpdateProfile = async () => {
    try {
      toggleSignup();

      const res = await dispatch(updateProfile(userPayload)).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
      toggleSignup();
    } catch (error) {
      toast.error(
        error.message || "Failed to update profile. Please enter valid data."
      );
    }
  };

  const toggleSignup = () => {
    account === "updateprofile"
      ? toggleAccount("profile")
      : toggleAccount("updateprofile");
  };

  return (
    <>
      <TopTabs tabVal={4} />
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
            background: "#15171c",
            padding: "2rem",
            boxShadow: "3px 5px 19px 6px #4d454536",
            borderRadius: "1rem",
            width: "300px",
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
              color: "white",
            }}
          >
            {account === "profile" ? "My Profile" : "Update Profile"}
          </Typography>

          {account === "profile" ? (
            <>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#9e9898",
                }}
              >
                User Name
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid gray",
                }}
              >
                {profileData?.username ? profileData.username : "Joy"}
              </Typography>

              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#9e9898",
                }}
              >
                Email
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid gray",
                }}
              >
                {profileData?.email ? profileData.email : "Joy"}
              </Typography>

              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#9e9898",
                }}
              >
                My Current Plan
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid gray",
                }}
              >
                {userPayload?.username ? userPayload.username : "Joy"}
              </Typography>

              <CancelButton
                variant="contained"
                style={{ marginBottom: "20px" }}
                onClick={() => navigate(`/subscription-plans/update/${2}`)}
              >
                Update Plan
              </CancelButton>
              <UpdateButton variant="contained" onClick={handleOpen}>
                Cancel Plan
              </UpdateButton>
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
                  color: "white",
                  backgroundColor: "white",
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
                  color: "white",
                  backgroundColor: "white",
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
                  color: "white",
                  backgroundColor: "white",
                }}
                label="Password"
                placeholder="Password"
                variant="standard"
                name="password"
                type="password"
                value={userPayload.password || ""}
                onChange={handleChange}
              />
              <UpdateProfile
                onClick={handleUpdateProfile}
                variant="contained"
                style={{ marginTop: "1rem" }}
              >
                Update Profile
              </UpdateProfile>
            </>
          )}

          {account !== "updateprofile" && (
            <UpdateProfile
              onClick={() => toggleAccount("updateprofile")}
              variant="contained"
              style={{ marginTop: "1rem" }}
            >
              Update Profile
            </UpdateProfile>
          )}
        </div>
      </div>
      <CancelModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleCancelSubscription={handleCancelSubscription}
      />
    </>
  );
}

export default MyProfile;
