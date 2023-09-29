import Product from "../models/product";
import ApiFilters from "../utils/apiFilters";
import { cloudinary, uploads } from "../utils/cloudnary";
import fs from "fs";

export const newProduct = async (req, res, next) => {
  req.body.user = req.user?._id;

  const newProduct = await Product.create(req.body);

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

  res.status(200).json({
    products,
    resPerPage,
    productsCount,
    filteredProductCount,
  });
};

export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({ product });
};

export const uploadProductImages = async (req, res, next) => {
  console.log(req.file);
  // CHECK IF THE PRODUCT EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      message: "product not found",
    });
  }

  // const urls = [];

  // const files = req.files;

  // for (const file of files) {
  //   const { path } = file;
  //   const imgURL = await uploader(path);
  //   urls.push(imgURL);

  //   //   //DELETE THE THE FILE FROM THE FILE SYSTEM
  //   fs.unlinkSync(path);
  // }
  // console.log(urls);
  // product = await Product.findByIdAndUpdate(req.query.id, {
  //   images: urls,
  // });
  if (!req.file) {
    return res.status(400).json({
      sucess: false,
      message: "please upload an image",
    });
  }

  // CALL THE CLOUDINARY-UPLOAD FUNCTION AND PASS THE PATH OF THE FILE AND THE CORRESPONDING FOLDER IN THE CLOUDINARY SERVER
  const uploader = async (path) => await uploads(path, "egadgetsApp/products");
  const { path } = req.file;

  const imgURL = await uploader(path);

  if (!imgURL) {
    return res.status(404).json({
      success: false,
      message: "Network error, image not uploaded",
    });
  }
  fs.unlinkSync(path);
  console.log(imgURL);
  await product.images.push(imgURL);

  console.log(product.images);
  await product.save();

  res.status(200).json({
    message: "success",
    data: imgURL,
    product,
  });
};

export const updateProduct = async (req, res, next) => {
  //CHECK IF THE PRODUCT EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({ product });
};

export const deleteProduct = async (req, res, next) => {
  //CHECK IF THE PRODUCT EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND
  let product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      message: "product not found",
    });
  }
  // Deleting the corresponding images for the product
  for (let i = 0; i < product.images?.length; i++) {
    const res = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  product = await Product.findByIdAndDelete(req.query.id);

  res.status(200).json({ message: "deleted Sucessfully" });
};

export const createProductReview = async (req, res, next) => {
  // GET THE REVIEWS FROM THE REQ.BODY OBJECT
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user?._id,
    rating: Number(rating),
    comment,
  };

  //CHECK IF THE PRODUCT EXISTS AND SEND A CORRESPONDING MESSAGE IF NOT FOUND
  let product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({
      message: "product not found",
    });
  }

  //CHECK IF THE USER ALREADY HAS A REVIEW, IF YES, YOU UPDATE THE REVIEW, ELSE YOU PUSH THE REVIEW OBJECT GOTTEN FROM THE FRONTEND TO THE REVIEW ARRAY
  const isReview = product?.reviews?.find(
    (r) => r.user?.toString() === req.user._id.toString()
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

  // CALCULATE THE RATINGS, AND SAVE
  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product?.reviews.length;

  await product?.save();
  res.status(200).json({ success: true });
};
