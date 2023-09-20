// import { NextResponse } from "next/server";
// import next from "next/types";
import Product from "../models/product";

import ApiFilters from "../utils/apiFilters";
import { cloudinary, uploads } from "../utils/cloudnary";
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
  console.log("files========>", req.files);
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      error: "product not found",
    });
  }

  const uploader = async (path) => await uploads(path, "egadgetsApp/products");

  const urls = [];

  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const imgURL = await uploader(path);
    urls.push(imgURL);
    fs.unlinkSync(path);
  }
  console.log(urls);
  product = await Product.findByIdAndUpdate(req.query.id, {
    images: urls,
  });

  res.status(200).json({ data: urls, product });
};

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      error: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({ product });
};

export const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      error: "product not found",
    });
  }
  // Deketing the corresponding images for the product
  for (let i = 0; i < product.images?.length; i++) {
    const res = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  product = await Product.findByIdAndDelete(req.query.id);

  res.status(200).json({ message: "deleted Sucessfully" });
};

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user?._id,
    rating: Number(rating),
    comment,
  };
  let product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({
      error: "product not found",
    });
  }

  const isReview = product?.reviews?.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReview) {
    product?.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product?.reviews?.push(review);
  }

product?.ratings = product?.reviews.reduce((acc, item)=> item.rating + acc, 0)/product.reviews.length 

await product?.save()
  res.status(200).json({ success: true });
};
