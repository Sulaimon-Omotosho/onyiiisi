import { NextResponse, NextRequest } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/authOptions";
import {
  GIGData,
  GIGLogin,
  GIGGetStations,
  GIGCaptureShipment,
} from "@/lib/gig-service";

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
    // Get the user session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Establish database connection
    await dbConnect();

    // Find the user document based on the session.user.name
    const user = await User.findOne({ name: session?.user?.name });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Parse request body to extract items, billing information, and payment method
    const { items, billingInfo, paymentMethod }: OrderRequestBody =
      await request.json();

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }
    if (!billingInfo || !paymentMethod) {
      return NextResponse.json(
        { error: "Billing information or payment method is missing" },
        { status: 400 }
      );
    }

    // const loginResponse = await GIGLogin(GIGData);
    // const accessToken = loginResponse.Object.access_token;

    // console.log("Access token:", accessToken);

    // Ensure each item has the necessary fields without productId
    const orderItems = items.map((item) => ({
      title: item.product_data.name,
      quantity: item.quantity,
      price: item.price,
      gram: item.gram,
      placeholder: item.product_data.placeholder,
    }));

    // Create a new Order instance with proper structure
    const newOrder = new Order({
      user: userId, // Associate the order with the user's _id
      items: orderItems,
      total: orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentMethod,
      email: billingInfo.email, // Extract email from billingInfo
      status: "pending", // Set default order status
      shippingAddress: {
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        phoneNumber: billingInfo.phoneNumber.toString(), // Convert phone number to string
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        postalCode: billingInfo.postalCode,
        country: billingInfo.country,
        deliveryNotes: billingInfo.deliveryNotes, // If delivery notes exist
      },
    });

    // Save the new order and return a success response
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
