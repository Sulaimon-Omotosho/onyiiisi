"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

interface UpdateOrderRequestBody {
  orderId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await dbConnect();

      const { orderId }: UpdateOrderRequestBody = req.body;

      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: "paid" },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating order" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
