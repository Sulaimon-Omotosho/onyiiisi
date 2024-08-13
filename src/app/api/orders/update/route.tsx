import { NextResponse, NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";
import { productByName, client } from "@/lib/sanity-client";

interface UpdateOrderRequestBody {
  orderId: string;
}

export const PUT = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { orderId }: UpdateOrderRequestBody = await request.json();

    // Find the order by ID and update its status to "paid"
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "paid" },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Loop through the items in the order and update product quantities
    for (const item of order.items) {
      const product = await productByName(item.title);
      if (product) {
        const newQuantity = product.quantity - item.quantity;
        await client.patch(product._id).set({ quantity: newQuantity }).commit();
      }
    }

    return NextResponse.json({ message: "Order updated successfully", order });
  } catch (error: any) {
    console.error(error);
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json(
      { message: `Error updating order: ${errorMessage}` },
      { status: 500 }
    );
  }
};
