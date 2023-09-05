import Stripe from "stripe";

const stripe = new Stripe(process.env.stripe_secret_key);

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
    cleint_reference_id: req?.user?.id,
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
