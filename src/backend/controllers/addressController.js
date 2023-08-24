import Address from "../models/addressModel";

export const newAddress = async (req, res) => {
  console.log(req.body, "--------------------------");
  const address = await Address.create(req.body);

  res.status(200).json({ address });
};

export const getAllAddress = async (req, res) => {
  const addresses = await Address.find();

  res.status(200).json({ addresses });
};
