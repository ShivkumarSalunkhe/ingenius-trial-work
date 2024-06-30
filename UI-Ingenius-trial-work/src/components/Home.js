import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Button,
  Link,
} from "@mui/material";
import TopTabs from "./TopTabs";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#15171c", height: "100%" }}>
      <TopTabs tabVal={0} />
      <Container sx={{ color: "white" }}>
        <Typography variant="h2" component="h1" mt={4} gutterBottom>
          Welcome to Our Gym
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Achieve your fitness goals with us. Join now and transform your life.
          <Link component={RouterLink} to="/subscription-plans">
            Explore Plans
          </Link>
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <Card>
              <video
                component="video"
                alt="Gym Video"
                height="660"
                src="https://cdn-videos.cure.fit/www-curefit-com/video/upload/cult-media/v2web/centers/center_221_VIDEO_1e490aaa-c040-4726-941c-c94912d3161b.mp4" // Replace with your video URL
                title="Gym Video"
                autoPlay
                controls
                style={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Gym Image 1"
                    height="200"
                    image="https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                    title="Gym Image 1"
                  />
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Gym Image 2"
                    height="200"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUnAa_BU4QA1_WcvhAjtkeVIjCmTb_HBEXrg&s"
                    title="Gym Image 2"
                  />
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Gym Image 3"
                    height="200"
                    image="https://images.squarespace-cdn.com/content/v1/5e9fa29359ec8929f48e1c2b/aa32c440-9680-43af-a4b6-20e151a8bc21/The%2BStrong%2BBody%2BMethod-6.jpeg"
                    title="Gym Image 3"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          style={{
            margin: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link component={RouterLink} to="/subscription-plans">
            <Button
              variant="outlined"
              style={{
                fontWeight: "bold",
                fontSize: "32px",
                color: "white",
                borderColor: "red",
              }}
            >
              Explore Plans
            </Button>
          </Link>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" component="p">
            Visit us today and experience the best gym in town!
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
