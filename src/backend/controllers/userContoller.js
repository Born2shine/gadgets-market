import User from "../models/userModel";

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
