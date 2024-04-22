"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Order from "@/models/Order";
import dbConnect from "@/lib/db";

interface FlutterwaveRequestBody {
  orderId: string;
  // Add other required data for Flutterwave
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { orderId /* other data */ }: FlutterwaveRequestBody = req.body;

      // Call the Flutterwave API to initiate the payment process
      const flutterwaveResponse = await initializeFlutterwavePayment(orderId);

      if (flutterwaveResponse.status === "successful") {
        // Handle successful payment initialization
        res.status(200).json(flutterwaveResponse);
      } else {
        // Handle payment initialization error
        res.status(400).json(flutterwaveResponse);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error initializing Flutterwave payment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

const initializeFlutterwavePayment = async (orderId: string) => {
  try {
    // Fetch order details from the database
    const order = await Order.findById(orderId);

    if (!order) {
      return { status: "error", message: "Order not found" };
    }

    // Get the required order details
    const { total, email, shippingAddress } = order;
    const { firstName, lastName, phoneNumber } = shippingAddress;

    // Generate a unique transaction reference
    const txRef = `tx-${Math.floor(Math.random() * 1000000000 + 1)}`;

    // Prepare the Flutterwave payment data
    const flutterwavePaymentData = {
      tx_ref: txRef,
      amount: total,
      currency: "USD", // or any other currency code
      redirect_url: `${process.env.NEXTAUTH_UR}/flutterwave-callback`,
      payment_options: "card,ussd",
      customer: {
        email,
        phonenumber: phoneNumber,
        name: `${firstName} ${lastName}`,
      },
      customizations: {
        title: "Payment for your order",
        description: "Pay for your order securely",
        // logo: "https://your-logo-url.com/logo.png", // Replace with your logo URL
      },
    };

    // Call the Flutterwave API to initiate the payment process
    const response = await axios.post(
      "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay",
      flutterwavePaymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    // Check the response from Flutterwave
    if (response.data.status === "success") {
      const { data } = response.data;

      // Redirect the user to the Flutterwave payment page
      window.location.href = data.link;

      return { status: "successful", message: "Payment initiated" };
    } else {
      return {
        status: "error",
        message: "Error initializing Flutterwave payment",
      };
    }
  } catch (error) {
    console.error("Error initializing Flutterwave payment:", error);
    return {
      status: "error",
      message: "Error initializing Flutterwave payment",
    };
  }
};
