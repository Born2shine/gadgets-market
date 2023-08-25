import User from "../models/userModel";
import AppError from "../utils/errClass";

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
