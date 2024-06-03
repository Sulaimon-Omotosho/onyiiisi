import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/authOptions";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isAdmin = user.is_admin === true;
    return NextResponse.json({ isAdmin }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
