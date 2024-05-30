import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/authOptions";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const gender = formData.get("gender")?.toString() || "";
    const dateOfBirth = new Date(formData.get("dateOfBirth")?.toString() || "");

    const user = await User.findOneAndUpdate(
      { email },
      { name, gender, dateOfBirth },
      { new: true, upsert: true }
    );
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
