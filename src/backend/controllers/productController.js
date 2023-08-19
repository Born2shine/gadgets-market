// import { NextResponse } from "next/server";
// import next from "next/types";
import Product from "../models/product";
import fs from "fs";
import ApiFilters from "../utils/apiFilters";

// const product = JSON.parse(
//   fs.readFileSync("../../data/products.json", "utf-8")
// );

// console.log(tour);

// export const createAllProducts = async (req, res, next) => {
//   const products = await Product.create(product);

//   res.status(201).json({ products });
// };

export const newProduct = async (req, res, next) => {
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
