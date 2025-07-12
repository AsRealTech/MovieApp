import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
    type: String,
    default: 'My Watchlist'
    }
    }, { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);