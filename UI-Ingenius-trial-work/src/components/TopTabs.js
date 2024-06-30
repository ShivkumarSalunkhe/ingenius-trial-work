import React, { useContext } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "./redux/slices/authSlice";
import ToastContext from "./Context/ToastContext";

const TopTabs = ({ tabVal }) => {
  const [value, setValue] = React.useState(tabVal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      toast.success(res?.message || "Logged out successfully!");
      navigate('/'); // Redirect to the login page after logout
    } catch (error) {
      toast.error(error.message || "Failed to log out. Please try again.");
    }
  };

  function samePageLinkNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          if (samePageLinkNavigation(event)) {
            event.preventDefault();
          }
          if (props.label === "Log Out") {
            handleLogout();
          } else {
            navigate(props.href);
          }
        }}
        aria-current={props.selected && "page"}
        {...props}
      />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage:
          "linear-gradient(to bottom, #171A26, rgba(30, 26, 38, 0.0001))",
        backgroundColor: "#2c2c2f",
        padding: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="white"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        <LinkTab label="Home" href="/home" />
        <LinkTab label="Subscription Plans" href="/subscription-plans" />
        <LinkTab label="My Profile" href="/my-profile" />
        <LinkTab label="Log Out" href="#" />
      </Tabs>
    </Box>
  );
};

export default TopTabs;
