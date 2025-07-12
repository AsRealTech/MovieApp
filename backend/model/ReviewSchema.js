import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      },
      comment: {
        type: String,
        maxlength: 1000
      }
    }, { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);