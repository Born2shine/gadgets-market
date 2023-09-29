import User from "../models/userModel";
import { uploads } from "../utils/cloudnary";
import fs from "fs";
import bcrypt from "bcryptjs";
import path from "path";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });

  // return NextResponse.json({ newProduct });
  res.status(201).json({ newUser });
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  // return NextResponse.json({ products });
  res.status(200).json({ users });
};

export const updateUser = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // CHECK IF THE USER EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND
  let updatedUser = await User.findById(req.user?._id);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // UPLOAD THE IMAGE TO CLOUDINARY ANAD DELETE THE IMAGE FROM THE FILE SYSTEM SUING THE FS MODULE
  if (req.file) {
    const uploader = async (path) =>
      await uploads(path, "egadgetsApp/userPhotos");

    const { path } = req.file;

    // console.log(path.resolve(req.file));

    console.log(path);

    const avatarResponse = await uploader(path);

    fs.unlinkSync(path);
    if (!avatarResponse) {
      return res.status(404).json({
        success: false,
        message: "Network error, image not uploaded",
      });
    }
    newUserData.avatar = avatarResponse;
  }

  // UPDATE THE USER AND SEND RESPONSE TO THE FRONTEND
  updatedUser = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(200).json({
    success: true,
    updatedUser,
  });
};

export const updatePassword = async (req, res, next) => {
  //CHECK IF THE USER EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "session expired, please login again to perform this action",
    });
  }

  //COMPARE THE INPUTTED PASSWORD AND THE DATABASE PASSWORD USING THE BCRYPT PACKAGE, IF THEY DONT MATCH SEND A CORRESPONDING MESSGAE
  const isPasswordMatch = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "password does not match" });
  }

  //UPDATE THE USER PASSWORD AND SAVE THE DOCUMENT SO THAT THE PRESAVE MIDDLEWARE CAN WORK SO AS TO ENCRPT THE PASSWORD BEFORE SAVING TO DATABASE
  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};
