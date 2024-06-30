import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "./SubscriptionPlans.css"; 
import TopTabs from "../TopTabs";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSubscription,
  fetchPlans,
  updateSubscription,
} from "../redux/slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import ToastContext from "../Context/ToastContext";
import ConfirmModal from "../ConfirmModal";

const SubscriptionPlans = () => {

  const getSubscriptionImage = (planName) => {
  switch (planName.toLowerCase()) {
    case "basic":
      return "https://c4.wallpaperflare.com/wallpaper/163/606/534/ball-workout-fitness-gym-wallpaper-preview.jpg";
    case "standard":
      return "https://w0.peakpx.com/wallpaper/707/698/HD-wallpaper-bodybuilding-barbell-biceps-exercises-fitness-gym.jpg";
    case "pro":
      return "https://img.freepik.com/free-photo/couple-training-together-gym_651396-1076.jpg";
    default:
      return "";
  }
};

  const dispatch = useDispatch();
  const { toast } = useContext(ToastContext);
  const { planId, method } = useParams();
  const { plans, currentSubscription } = useSelector(
    (state) => state.subscription
  );
  const sortedPlans = plans.slice().sort((a, b) => a.id - b.id);
  const [open, setOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateSubscription = async () => {
    try {
      const res = await dispatch(createSubscription({ planId: selectedPlanId })).unwrap();
      toast.success(res?.message || "Subscription successful!");
      handleClose()
    } catch (error) {
      toast.error(error.message || "Subscription failed. Please select a valid plan.");
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      const res = await dispatch(updateSubscription({ planId: planId })).unwrap();
      toast.success(res?.message || "Subscription plan updated successfully!");
      handleClose()
    } catch (error) {
      toast.error(error.message || "Failed to update subscription plan. Please select a valid plan.");
    }
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
    handleOpen();
  };

  return (
    <>
      <div style={{ backgroundColor: "#15171c", minHeight: "100vh" }}>
        <TopTabs tabVal={1} />
        <Container sx={{ color: "white", paddingTop: "30px" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Choose Your Subscription
          </Typography>

          <Grid container spacing={2}>
            {sortedPlans.map((plan) => (
              <Grid item key={plan.id} xs={12} sm={4}>
                <Box className="subscription-card">
                  <Card
                    style={{
                      backgroundColor: "#15171c",
                      color: "white",
                      border: "2px solid #4a107c",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={`${plan.name} Subscription`}
                      height="300"
                      image={getSubscriptionImage(plan.name)}
                      title={`${plan.name} Subscription`}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        color="pink"
                      >
                        {plan.name}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {plan.description}
                      </Typography>
                      <Typography variant="body2" color="white" style={{fontSize:'28px', marginTop:'20px',color:'greenyellow'}}>
                        {`$ ${plan.price} / Year`}
                      </Typography>
                    </CardContent>
                    <Box
                      style={{
                        margin: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "black",
                          borderColor: "black",
                          backgroundColor: "pink",
                        }}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Subscribe Now
                      </Button>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        handleSubscription={method === "update" ? handleUpdateSubscription : handleCreateSubscription}
      />
    </>
  );
};


export default SubscriptionPlans;
