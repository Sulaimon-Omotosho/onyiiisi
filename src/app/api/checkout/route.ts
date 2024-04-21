import { NextResponse, NextRequest } from "next/server";
import { ProductProps } from "@/lib/types";
// import { urlFor } from "@/lib/sanity-client";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { items, email } = reqBody;
    const updatedItems = await items.map((item: ProductProps) => ({
      quantity: item.productQuantity,
      price: item.price,
      brand: item.brand,
      gram: item.gram,
      product_data: {
        name: item.title,
        description: item.description,
        image: item.image,
      },
    }));
    return NextResponse.json({ updatedItems });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
