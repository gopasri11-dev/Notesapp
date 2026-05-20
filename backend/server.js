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

<<<<<<< HEAD
app.use(cors({
  origin: "https://notesapp-two-delta.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
=======
app.use(cors({ origin: "https://notesapp-two-delta.vercel.app/"}));
>>>>>>> 346eeae50cc8041d2140cd6d003d60174abc5915

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
