import { NextResponse, NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

interface UpdateOrderRequestBody {
  orderId: string;
}

export const PUT = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { orderId }: UpdateOrderRequestBody = await request.json();

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "paid" },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating order" },
      { status: 500 }
    );
  }
};
