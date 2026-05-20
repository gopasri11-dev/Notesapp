const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const authRoutes=require('./routes/authRoutes');
const noteRoutes=require("./routes/noteRoutes")


const connectDB =require("./config/db.js");
const app = express();
console.log("JWT SECRET:", process.env.JWT_SECRET);

app.use(cors({ origin: "http://localhost:5173"}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

/* MongoDB Connect */
connectDB();

app.get("/", (req, res) => {

  res.send("Server Running");

});

app.listen(5000, () => {

  console.log(" Server Started");

});