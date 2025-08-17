import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// Avoid model overwrite errors in dev/hot-reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;