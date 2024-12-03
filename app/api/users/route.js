import mongooseConnect from "@/app/lib/mongoose";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await mongooseConnect();
    const users = await User.find({});

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      error: "Error fetching cartItem",
      details: error.message,
    });
  }
}
