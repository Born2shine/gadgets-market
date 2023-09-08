import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    types: mongoose.Schema.ObjectId,
    ref: "Address",
    required: true,
  },

  user: {
    types: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  orderItem: [
    {
      product: {
        types: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },

      name: {
        trype: String,
        required: true,
      },

      quantity: {
        trype: String,
        required: true,
      },

      image: {
        trype: String,
        required: true,
      },

      price: {
        trype: String,
        required: true,
      },
    },
  ],

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    taxPaid: {
      type: Number,
    },
  },

  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
