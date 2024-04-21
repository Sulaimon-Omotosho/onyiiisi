"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

interface OrderRequestBody {
  items: any[];
  billingInfo: {
    [key: string]: string | number;
  };
  paymentMethod: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { items, billingInfo, paymentMethod }: OrderRequestBody = req.body;

      const newOrder = new Order({
        items,
        total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        paymentMethod,
        email: billingInfo.email,
        status: "pending",
        shippingAddress: {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          phoneNumber: billingInfo.phoneNumber,
          address: billingInfo.address,
          city: billingInfo.city,
          state: billingInfo.state,
          postalCode: billingInfo.postalCode,
          country: billingInfo.country,
          deliveryNotes: billingInfo.deliveryNotes,
        },
      });

      const order = await newOrder.save();
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
