import User from "../models/userModel";
import { uploads } from "../utils/cloudnary";
import AppError from "../utils/errClass";
import fs from "fs";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    return next(new AppError());
  }

  // return NextResponse.json({ newProduct });
  res.status(201).json({ newUser });
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  // return NextResponse.json({ products });
  res.status(200).json({ users });
};

export const updateUser = async (req, res, next) => {
  const newUserData = { name: req.body.name, email: req.body.email };

  if (req.files.length > 0) {
    const uploader = async (path) => await uploads(path, "buyitnow/avatars");

    const file = req.files[0];
    const { path } = file;

    const avatarResponse = await uploader(path);
    fs.unlinkSync(path);
    newUserData.avatar = avatarResponse;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, newUserData);

  // return NextResponse.json({ newProduct });
  res.status(200).json({
    status: "SUCESS",
    updatedUser,
  });
};
