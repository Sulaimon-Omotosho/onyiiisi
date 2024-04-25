import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";

export const GET = async (request: Request) => {
  const session = await getServerSession();

  if (!session) {
    console.log("Unauthorized access attempted");
    return NextResponse.json({ message: "Signin required" }, { status: 401 });
  }

  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    const orders = await Order.find({});
    console.log(`Fetched ${orders.length} orders`);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
