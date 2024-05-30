import { NextResponse, NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";
import { productById, client } from "@/lib/sanity-client";

interface UpdateOrderRequestBody {
  orderId: string;
}

export const PUT = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { orderId }: UpdateOrderRequestBody = await request.json();

    const order = await Order.findByIdAndUpdate(orderId);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    order.status = "paid";
    await order.save();

    for (const item of order.items) {
      const product = await productById(item.productId);
      if (product) {
        const newQuantity = product.quantity - item.quantity;
        await client.patch(product._id).set({ quantity: newQuantity }).commit();
      }
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
