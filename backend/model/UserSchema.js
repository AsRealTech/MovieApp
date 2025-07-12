import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3},
    useremail: { type: String, required: true, unique: true, lowcase: true },
    password: { type: String, required: true },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Watchlist'}],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
}, { timestamps: true });

userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
