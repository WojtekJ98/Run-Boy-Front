import { NextResponse } from "next/server";
import { User } from "@/app/models/User";
import mongooseConnect from "@/app/lib/mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await mongooseConnect();
    const body = await req.json();
    console.log("Received data in Post route: ", body);

    const { name, email, password, createdAt } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    // if (
    //   !existingUser ||
    //   !(await bcrypt.compare(password, existingUser.password))
    // ) {
    //   return NextResponse.json(
    //     { error: "Invalid email or password" },
    //     { status: 401 }
    //   );
    // }
    const hashedPassword = await bcrypt.hash(password, 10);

    const UserDoc = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt,
    });
    return NextResponse.json({
      message: "User added",
      user: UserDoc,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding user", details: error.message },
      { status: 500 }
    );
  }
}
