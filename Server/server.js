require("dotenv").config();

const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const { userRouter } = require("./routes/userRoute");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_FRONTEND_URL
        : process.env.DEV_FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", userRouter);

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_MONGO_URI
    : process.env.PROD_MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("App connected to PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
