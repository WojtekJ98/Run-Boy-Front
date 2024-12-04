import mongooseConnect from "@/app/lib/mongoose";
import { CartItem } from "@/app/models/CartItems";
import { Order } from "@/app/models/Order";
import { buffer } from "micro";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Checkout session completed!");

      const { userId, inputs, cartDetails } = session.metadata;
      console.log("Session metadata:", session.metadata);

      try {
        await mongooseConnect();

        const sessionTransaction = await mongoose.startSession();
        sessionTransaction.startTransaction();

        await Order.create(
          [
            {
              name: JSON.parse(inputs).name,
              email: JSON.parse(inputs).email,
              city: JSON.parse(inputs).city,
              postalCode: JSON.parse(inputs).postalCode,
              streetAddress: JSON.parse(inputs).streetAddress,
              country: JSON.parse(inputs).country,
              lineItems: JSON.parse(cartDetails),
              user: userId,
              paid: true,
            },
          ],
          { session: sessionTransaction }
        );

        await CartItem.deleteMany(
          { user: userId },
          { session: sessionTransaction }
        );

        await sessionTransaction.commitTransaction();
        sessionTransaction.endSession();
        console.log("Order created and cart cleared successfully!");
      } catch (error) {
        console.error("Error processing order and clearing cart:", error);
        if (sessionTransaction) {
          await sessionTransaction.abortTransaction();
          sessionTransaction.endSession();
        }
      }

      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      console.log(
        "PaymentIntent failed:",
        failedPaymentIntent.last_payment_error?.message
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
