import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password }: SignupBody = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    console.log("Checking for existing user:", existingUser);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Server error." }, { status: 500 });
  }
}
