import Address from "../models/addressModel";

export const newAddress = async (req, res) => {
  console.log(req.body, "--------------------------");
  const { newAddress } = req.body;
  console.log(newAddress, "--------------------------");
  const address = await Address.create(newAddress);

  res.status(201).json({ address });
};

export const getAllAddress = async (req, res) => {
  const addresses = await Address.find();

  res.status(200).json({ addresses });
};

export const deleteAllAddress = async (req, res) => {
  const addresses = await Address.deleteMany();

  res.status(200).json({ message: "deleted Succesfully!" });
};
