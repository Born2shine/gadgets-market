import Address from "../models/addressModel";
import AppError from "../utils/errClass";

export const newAddress = async (req, res) => {
  const { newAddress } = req.body;
  newAddress.user = req.user._id;

  const address = await Address.create(newAddress);

  res.status(201).json({ address });
};

export const getAllAddress = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });

  res.status(200).json({ addresses });
};

export const getAddress = async (req, res) => {
  const address = await Address.findbyId(req.query.id);

  if (!address) {
    return next(new AppError("Address not found", 404));
  }

  res.status(200).json({ address });
};

export const updateAddress = async (req, res) => {
  const address = await Address.findByIdAndUpdate(req.query.id, req.body);

  if (!address) {
    return next(new AppError("Address not found", 404));
  }

  res.status(200).json({ address });
};

export const deleteAddress = async (req, res) => {
  const address = await Address.findByIdAndDelete(req.query.id);

  if (!address) {
    return next(new AppError("Address not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "deleted",
  });
};

export const deleteAllAddress = async (req, res) => {
  const addresses = await Address.deleteMany();

  res.status(200).json({ message: "deleted Succesfully!" });
};
