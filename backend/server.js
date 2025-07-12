import app from "./index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, console.log(`running on http://localhost:${PORT}`))
}).catch(err => console.error(`mongodb: `, err));