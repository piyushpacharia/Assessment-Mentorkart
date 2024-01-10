const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
const dotenv = require("dotenv")
dotenv.config()

mongoose
  .connect(
    process.env.DATABASE_URL
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Something went Wrong", err.message));

// importing routes
const authRoutes = require("./routes/Authentication");
const formRoutes = require("./routes/FormData");

//adding server check route

app.get("/", (req, res) =>
  res.json({ success: true, message: "Server is Running Fine" })
);

app.use("/auth", authRoutes);
app.use("/form-data", formRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running at : ${PORT} `));
