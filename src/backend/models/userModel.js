import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input Your Full Name"],
  },
  email: {
    type: String,
    required: [true, "please input a validate email"],
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "your password must be longer than 6 character"],
    select: false,
  },

  avatar: {
    public_id: String,
    url: String,
  },

  role: {
    type: String,
    enum: ["user", "superAdmin", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangeAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isNew) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordChangeAt = Date.now() - 2000;
});

export default mongoose.models.User || mongoose.model("User", userSchema);
