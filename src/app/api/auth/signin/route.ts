import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface SignUpRequestBody {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, name }: SignUpRequestBody = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const newUser = await User.create({ email, password, name });

    return NextResponse.json(
      { message: "User signed up successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
