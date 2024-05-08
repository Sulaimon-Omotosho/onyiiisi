import { NextResponse, NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

// POST route that receives an order ID and does not return any order details.
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const orderId = body.orderId;

    // This is the identifier passed in the POST request
    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 }
      );
    }
    await dbConnect(); // Establish database connection
    const _id = orderId;
    // Find the order by _id
    const order: OrderDoc | null = await Order.findById(_id);

    if (!order) {
      // If no order is found with the given _id
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.log("Order object:", order);
    // If the order is found, return the entire order object
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error processing order details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
