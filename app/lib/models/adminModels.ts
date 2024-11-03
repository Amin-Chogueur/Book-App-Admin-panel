import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerfy: { type: Boolean, default: false },
  forgotPsswordToken: String,
  forgotPsswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const AdminBookApp =
  mongoose.models.AdminBookApp || mongoose.model("AdminBookApp", adminSchema);

export default AdminBookApp;
