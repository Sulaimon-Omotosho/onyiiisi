import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { servCode, rToken, cId } = await req.json();

  const createShipmentUrl = `${process.env.SB_BASE_URL}/shipping/labels`;
  const bearerToken = process.env.SB_PASSKEY;

  if (!createShipmentUrl || !bearerToken) {
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const createShipmentResponse = await fetch(createShipmentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        request_token: rToken,
        service_code: servCode,
        courier_id: cId,
      }),
    });

    if (!createShipmentResponse.ok) {
      const errorResponse = await createShipmentResponse.json();
      throw new Error(
        `Create Shipment API request failed: ${createShipmentResponse.status} ${
          createShipmentResponse.statusText
        } - ${JSON.stringify(errorResponse)}`
      );
    }

    const createShipmentData = await createShipmentResponse.json();

    return NextResponse.json({
      createShipmentData,
    });
  } catch (error) {
    let errorMessage = "An error occurred while processing your request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error:", errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
