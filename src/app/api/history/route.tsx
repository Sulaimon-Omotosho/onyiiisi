import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/authOptions";

export const GET = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("Unauthorized access attempted");
      return NextResponse.json(
        { message: "Sign in required" },
        { status: 401 }
      );
    }

    await dbConnect();
    console.log("Connected to MongoDB");

    // Find the user document based on the session.user.email
    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Find orders where the user field matches the logged-in user's _id
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    console.log(`Fetched ${orders.length} orders`);
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    if (error.name === "MongoServerError") {
      // Handle specific MongoDB errors
      return NextResponse.json(
        { error: "MongoDB Server Error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
