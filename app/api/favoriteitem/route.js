import mongooseConnect from "@/app/lib/mongoose";
import { FavoriteItem } from "@/app/models/FavoriteItem";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await mongooseConnect();
    const body = await req.json();
    console.log("Received data in Post route: ", body);
    console.log("user", body.user);
    console.log("product", body.product);
    const FavoriteItemDoc = await FavoriteItem.create({
      user: body.user,
      product: body.product,
      addedAt: new Date(),
    });
    return NextResponse.json({
      message: "Item added to favorite",
      favoriteItem: FavoriteItemDoc,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error adding item to favorites",
      details: error.message,
    });
  }
}

export async function GET() {
  try {
    await mongooseConnect();
    const favoriteItem = await FavoriteItem.find({});
    return NextResponse.json(favoriteItem);
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
    console.log("ID to delete", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const favoriteItemDelete = await FavoriteItem.deleteOne({ product: id });
    console.log("Delete result", favoriteItemDelete);
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error delete favoriteItem", details: error.message },
      { status: 500 }
    );
  }
}
