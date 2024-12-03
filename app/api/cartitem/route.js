import mongooseConnect from "@/app/lib/mongoose";
import { CartItem } from "@/app/models/CartItems";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();
    const body = await req.json();

    const CartItemDoc = await CartItem.create({
      user: body.user,
      product: body.product,
      quantity: body.quantity,
      size: body.size,
      addedAt: new Date(),
    });
    return NextResponse.json({
      message: "Product added",
      cartItem: CartItemDoc,
    });
  } catch (error) {
    return NextResponse.json(
      console.error("Error details:", error),

      { error: "Error adding user", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongooseConnect();
    const cartItem = await CartItem.find({});
    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cartItem", details: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    await mongooseConnect();
    const { id } = await req.json();
    console.log("ID to delete:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const cartItemDelete = await CartItem.deleteOne({ product: id });
    console.log("Delete result:", cartItemDelete);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cartItem", details: error.message },
      { status: 500 }
    );
  }
}
