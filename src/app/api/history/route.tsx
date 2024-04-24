import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ message: "Signin required" });
  }
  const { user } = session;
  try {
    await dbConnect();
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
