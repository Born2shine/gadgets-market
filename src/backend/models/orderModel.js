import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
    required: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  orderItem: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      quantity: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      price: {
        type: String,
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
