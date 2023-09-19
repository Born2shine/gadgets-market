import Address from "../models/addressModel";

export const newAddress = async (req, res) => {
  const { newAddress } = req.body;
  newAddress.user = req.user._id;

  const address = await Address.create(newAddress);

  res.status(201).json({ address });
};

export const getAllAddress = async (req, res, next) => {
  const addresses = await Address.find({ user: req.user?._id });

  res.status(200).json({ addresses });
};

export const getAddress = async (req, res, next) => {
  const address = await Address.findById(req.query.id);

  if (!address) {
    return res.status(404).json({ message: "order not found" });
  }

  res.status(200).json({ address });
};

export const updateAddress = async (req, res, next) => {
  let address = await Address.findById(req.query.id);

  if (!address) {
    return res.status(404).json({ message: "order not found" });
  }

  address = await Address.findByIdAndUpdate(
    req.query.id,
    req.body.updatedAddress
  );

  res.status(200).json({ address });
};

export const deleteAddress = async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.query.id);

  if (!address) {
    return res.status(404).json({ message: "order not found" });
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
