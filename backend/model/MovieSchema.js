import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    title: String,
    poster_path: String,
    release_date: String,
    genre_ids: [Number],
    overview: String,
    popularity: Number
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);