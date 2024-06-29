const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize, testDbConnection } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

testDbConnection();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
