const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
require('dotenv').config();
const cors = require('cors'); // Import the cors package

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from http://localhost:5173
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

// Configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});

module.exports = app;
