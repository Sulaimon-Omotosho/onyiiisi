import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

interface OrderItem {
  quantity: number;
  price: number;
  title: string;
  brand?: string;
  gram?: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const { orderId } = await request.json();
    console.log(orderId);
    // Redirect the client to the route that fetches the order details
    return NextResponse.redirect(`/api/orders/details/${orderId}`);
  } catch (error) {
    console.error("Failed to process order details request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { _id: string } }
) => {
  try {
    const { _id } = params;
    // Connect to the database
    await dbConnect();

    // Find the order by ID
    const order: OrderDoc | null = await Order.findById(_id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Return the order details
    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
