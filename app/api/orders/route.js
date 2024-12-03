import mongooseConnect from "@/app/lib/mongoose";
import { Order } from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }
  try {
    await mongooseConnect();
    const userOrders = await Order.find({ user: userId });
    return NextResponse.json(userOrders);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching userOrders", details: error.message },
      { status: 500 }
    );
  }
}
