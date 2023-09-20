import User from "../models/userModel";
import ApiFilters from "../utils/apiFilters";

export const getAllUsers = async (req, res, next) => {
  const resPerPage = 5;
  const usersCount = await User.countDocuments();

  const apiFilter = new ApiFilters(User.find(), req.query).pagination(
    resPerPage
  );

  const users = await apiFilter.query;

  res.status(200).json({
    usersCount,
    resPerPage,
    users,
  });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res, next) => {
  let user = await User.findById(req.query.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  user = await User.findByIdAndUpdate(req.query.id, req.body.userData);
  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res, next) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  user = await User.findByIdAndDelete(req.query.id);

  res.status(200).json({
    success: true,
    message: "user Deleted Sucessfully",
  });
};
