import mongooseConnect from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await mongooseConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({
      error: "Error fetching products",
      details: error.message,
    });
  }
}
