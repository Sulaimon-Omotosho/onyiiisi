import { NextResponse, NextRequest } from "next/server";
import Order from "@/models/Order"; // Import the Order model with the updated schema
import dbConnect from "@/lib/db";

interface ItemData {
  gram: string;
  price: number;
  product_data: { name: string; description: string };
  quantity: number;
}

interface OrderRequestBody {
  items: ItemData[];
  billingInfo: { [key: string]: string | number };
  paymentMethod: string;
}

export const POST = async (request: NextRequest) => {
  try {
    // Establish database connection
    await dbConnect();

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

    // Ensure each item has the necessary fields without productId
    const orderItems = items.map((item) => ({
      title: item.product_data.name, // Assuming the 'title' comes from product_data.name
      quantity: item.quantity,
      price: item.price,
      gram: item.gram,
      brand: item.product_data.name,
    }));

    // Create a new Order instance with proper structure
    const newOrder = new Order({
      items: orderItems,
      total: orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ), // Calculate total order cost
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  } //catch (error) {
  //   console.error("Error:", error);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
};
