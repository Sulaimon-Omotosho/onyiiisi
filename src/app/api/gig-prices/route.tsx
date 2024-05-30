import { NextResponse, NextRequest } from "next/server";
import {
  GIGData,
  GIGGetStations,
  GIGCaptureShipment,
  GIGLogin,
} from "@/lib/gig-service";
import { number } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    // Get the address data from the request body
    const { addressData, parsedItems } = await request.json();
    const { address, city, state, country, phoneNumber, firstName } =
      addressData;

    // Log in to the GIG service
    const loginResponse = await GIGLogin(GIGData);
    const accessToken = loginResponse.Object.access_token;
    // Get shipping stations from GIG
    const stations = await GIGGetStations(accessToken);
    // Return the stations data as a response
    return NextResponse.json({ stations });

    const shipmentData = {
      ReceiverAddress: address,
      CustomerCode: "ECO001449",
      SenderLocality: "Ifako Ijaye",
      SenderAddress: process.env.SENDER_ADDRESS!,
      ReceiverPhoneNumber: phoneNumber,
      VehicleType: "BIKE",
      SenderPhoneNumber: process.env.SENDER_PHONE_NUMBER || "+2347038973562",
      SenderName: process.env.SENDER_NAME || "Onyiisi",
      ReceiverName: firstName,
      UserId: "f02ff192-11af-46b6-bd0abf118d0c3d47",
      ReceiverStationId: stations.Object.find(
        (station: { Name: string }) => station.Name === city
      ).Id,
      SenderStationId: stations.Object.find(
        (station: { Name: string }) =>
          station.Name === process.env.SENDER_STATION
      ).Id,
      ReceiverLocation: {
        Latitude: addressData.receiverLatitude,
        Longitude: addressData.receiverLongitude,
      },
      SenderLocation: {
        Latitude: process.env.SENDER_LATITUDE!,
        Longitude: process.env.SENDER_LONGITUDE!,
      },
      PreShipmentItems: parsedItems.map(
        (item: {
          quantity: string;
          gram: string;
          product_data: { name: string; description: string };
          price: number;
        }) => ({
          SpecialPackageId: "0",
          Quantity: item.quantity.toString(),
          Weight: item.gram.toString(),
          ItemType: "Normal",
          WeightRange: "0",
          ItemName: item.product_data.name,
          Value: item.price.toString(),
          ShipmentType: "Regular",
          Description: item.product_data.description,
          ImageUrl: "",
        })
      ),
    };

    console.log(shipmentData);

    // Capture the shipment
    // const captureShipmentResponse = await GIGCaptureShipment(
    //   accessToken,
    //   shipmentData
    // );
    //return the capture shipment response
    // return NextResponse.json(captureShipmentResponse);
    // console.log(NextResponse.json(captureShipmentResponse));
  } catch (error) {
    console.error("Error fetching stations:", error);
    return NextResponse.json(
      { error: "Failed to fetch stations" },
      { status: 500 }
    );
  }
};
