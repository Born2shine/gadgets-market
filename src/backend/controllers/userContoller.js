import User from "../models/userModel";
import { uploads } from "../utils/cloudnary";
import AppError from "../utils/errClass";
import fs from "fs";
import bcrypt from "bcryptjs";
import formidable from "formidable";

export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await User.create({ name, email, password, role });

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
  console.log("files------>", req.files);
  const file = req.files[0];

  const { path } = file;
  console.log("path------>", path);

  // const formData = await req.formData();

  // const file = formData.get("file");

  // console.log("files------>", req.files);

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // if (req.files.length > 0) {
  //   const uploader = async (path) =>
  //     await uploads(path, "egadgetsApp/userPhotos");

  //   const file = req.files[0];

  //   console.log(file);

  //   const { path } = file;

  //   const avatarResponse = await uploader(path);
  //   console.log(avatarResponse);
  //   fs.unlinkSync(path);
  //   newUserData.avatar = avatarResponse;
  // }

  // // console.log(newUserData);
  // const updatedUser = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(200).json({
    status: "SUCESS",
    // updatedUser,
  });
};

export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatch = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatch) {
    return next(new AppError("old password is incorrect", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};
