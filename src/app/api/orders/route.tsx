import { NextResponse, NextRequest } from "next/server";
import Order, { OrderDoc } from "@/models/Order";
import dbConnect from "@/lib/db";

interface OrderRequestBody {
  items: any[];
  billingInfo: { [key: string]: string | number };
  paymentMethod: string;
}

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { items, billingInfo, paymentMethod }: OrderRequestBody =
      await request.json();

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

    return NextResponse.json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
};
