import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./routes/routes.js";
import auth from "./routes/auth.js";
import authenticateToken from "./middleware/authMiddleware.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log("connected to mongoose"))
  .catch(error => console.error('failed to connect to db: ' + error.message));

app.get("/", (req, res) => {
    res.json({message: " Api is working"});
});

app.use("/api", router);

app.use("/auth", auth);

// Protected dashboard route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({message: `Welcome to your dashboard, user ID: ${req.user.id}`});
});

app.listen(PORT, console.log(`server running http://localhost:${PORT}`));