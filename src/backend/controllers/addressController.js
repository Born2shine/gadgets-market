import Address from "../models/addressModel";

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

export const deleteAllAddress = async (req, res) => {
  const addresses = await Address.deleteMany();

  res.status(200).json({ message: "deleted Succesfully!" });
};
