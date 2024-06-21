import { NextResponse, NextRequest } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/authOptions";

interface ItemData {
  gram: string;
  price: number;
  product_data: { name: string; description: string; placeholder: any };
  quantity: number;
}

interface OrderRequestBody {
  items: ItemData[];
  billingInfo: { [key: string]: string | number };
  paymentMethod: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ name: session?.user?.name });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    const { items, billingInfo, paymentMethod }: OrderRequestBody =
      await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }
    if (!billingInfo || !paymentMethod) {
      return NextResponse.json(
        { error: "Billing information or payment method is missing" },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      const { product_data } = item;
      if (
        !product_data.placeholder ||
        !product_data.placeholder._type ||
        !product_data.placeholder.asset ||
        !product_data.placeholder.asset._ref ||
        !product_data.placeholder.asset._type
      ) {
        console.log(
          "Invalid or missing placeholder:",
          product_data.placeholder
        ); // Log the placeholder
        return NextResponse.json(
          {
            error: `Invalid or missing placeholder in product data for item: ${product_data.name}`,
          },
          { status: 400 }
        );
      } else {
        console.log("Valid placeholder:", product_data.placeholder);
      }
    }

    // If validation passes, create the order items array
    const orderItems = items.map((item) => {
      const { product_data, quantity, price, gram } = item;
      return {
        title: product_data.name,
        quantity,
        price,
        gram,
        placeholder: product_data.placeholder,
      };
    });

    // Create a new Order instance with proper structure
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      total: orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentMethod,
      email: billingInfo.email,
      status: "pending",
      shippingAddress: {
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        phoneNumber: billingInfo.phoneNumber.toString(),
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        postalCode: billingInfo.postalCode,
        country: billingInfo.country,
        deliveryNotes: billingInfo.deliveryNotes,
      },
    });

    await newOrder.save();
    return NextResponse.json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
