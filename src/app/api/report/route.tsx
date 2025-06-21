import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Report from "@/models/Report";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const requiredFields = ["title", "companyName", "date", "content", "design", "production", "qc"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    const newReport = await Report.create(data);

    return NextResponse.json(
      {
        message: "Report created successfully.",
        report: newReport,
      },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

// read store data
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const reports = await Report.find({}).sort({ createdAt: -1 });

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

