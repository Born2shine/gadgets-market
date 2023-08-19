import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product is required"],
  },
  description: {
    type: String,
    required: [true, "a description is required for a product"],
  },
  price: {
    type: Number,
    required: [true, "a price is required for a product"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "a Category is required for a product"],
    enum: {
      values: [
        "Electronics",
        "cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports",
      ],
      message: "please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "please enter a seller"],
  },
  stock: {
    type: Number,
    required: [true, "please enter a stock"],
  },

  stock: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ratings: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
