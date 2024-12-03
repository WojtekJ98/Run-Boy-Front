import mongooseConnect from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(req, res) {
  await mongooseConnect();
  const body = await req.json();

  const { inputs, user, cartDetails } = body;
  const cartDetailsArray = Object.values(cartDetails);
  const processedCartDetails = cartDetailsArray.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    size: item.size,
    quantity: item.quantity,
    image: item.images[0],
  }));

  const lineItems = processedCartDetails.map((item) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      success_url: process.env.NEXTAUTH_URL + "/account?success=1",
      cancel_url: process.env.NEXTAUTH_URL + "/account?canceled=1",
      metadata: {
        userId: user.id,
        inputs: JSON.stringify(inputs),
        cartDetails: JSON.stringify(processedCartDetails),
      },
    });
    console.log("Session:", session);

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}

// cheery-trump-tough-enjoy
//acct_1Q80PNKd4wK76ctU

//
