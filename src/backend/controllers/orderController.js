import getRawBody from "raw-body";
import Stripe from "stripe";
import Order from "@/backend/models/orderModel";
import ApiFilters from "../utils/apiFilters";

const stripe = new Stripe(process.env.stripe_secret_key);

export const myOrders = async (req, res, next) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilter = new ApiFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilter.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const checkoutSession = async (req, res, next) => {
  const body = req.body;

  const line_items = body?.items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const shippingInfo = body.shippingInfo;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.URL}/me/orders?order_success=true`,
    cancel_url: `${process.env.URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id,
    mode: "payment",
    metadata: { shippingInfo },
    shipping_options: [
      {
        shipping_rate: "shr_1NmxeCFKNIl4RqjzKx4F7R0d",
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url,
  });
};

async function getCartItem(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export const webhook = async (req, res) => {
  // console.log("req---------------->", req);

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.stripe_webhook_secret
    );
    // console.log("events---------------->", event);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      console.log(session);

      const orderItems = await getCartItem(line_items);

      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      console.log("orderdata------->", orderData);

      const order = await Order.create(orderData);

      res.status(201).json({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// export const getAllOrder = async (req, res) => {
//   const orders = await Order.find();

//   res.status(200).json({
//     orders,
//   });
// };
