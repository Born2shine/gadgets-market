// import { NextResponse } from "next/server";
// import next from "next/types";
import Product from "../models/product";

import ApiFilters from "../utils/apiFilters";
import { uploads } from "../utils/cloudnary";
import fs from "fs";
// export const createAllProducts = async (req, res, next) => {
//   const products = await Product.create(product);

//   res.status(201).json({ products });
// };

export const newProduct = async (req, res, next) => {
  req.body.user = req.user?._id;

  const newProduct = await Product.create(req.body);

  // return NextResponse.json({ newProduct });
  res.status(201).json({ newProduct });
};

export const getAllProducts = async (req, res, next) => {
  const resPerPage = 3;
  const productsCount = await Product.countDocuments();

  const filter = new ApiFilters(Product.find(), req.query).search().filter();

  let products = await filter.query;

  const filteredProductCount = products.length;

  filter.pagination(resPerPage);

  products = await filter.query.clone();

  // return NextResponse.json({ products });
  res.status(200).json({
    products,
    resPerPage,
    productsCount,
    filteredProductCount,
  });
};

export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  // return NextResponse.json({ products });
  res.status(200).json({ product });
};

export const uploadProductImages = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      error: "product not found",
    });
  }

  const uploader = async (path) => await uploads(path, "buyitnow/products");

  const urls = [];

  const files = req.files[0];

  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  product = await Product.findByIdAndUpdate(req.query.id, {
    images: urls,
  });

  res.status(200).json({ data: urls, product });
};
