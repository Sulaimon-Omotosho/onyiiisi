import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { addressData, parsedItems, deliveryNotes } = await req.json();

  if (!addressData) {
    return NextResponse.json(
      { message: "Address data is required" },
      { status: 400 }
    );
  }

  const validateApiUrl = `${process.env.SB_BASE_URL}/shipping/address/validate`;
  const fetchRatesApiUrl = `${process.env.SB_BASE_URL}/shipping/fetch_rates`;
  const createLabelApiUrl = `${process.env.SB_BASE_URL}/shipping/labels`;
  const bearerToken = process.env.SB_PASSKEY;

  if (
    !validateApiUrl ||
    !fetchRatesApiUrl ||
    !createLabelApiUrl ||
    !bearerToken
  ) {
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  // Transform parsedItems to the required format
  const formattedItems = parsedItems.map((item: any) => ({
    name: item.product_data.name,
    description: item.product_data.description,
    unit_weight: parseFloat(item.gram),
    unit_amount: item.price,
    quantity: item.quantity,
  }));

  try {
    // First API call to validate address
    const validateResponse = await fetch(validateApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        phone: addressData.phoneNumber,
        email: addressData.email,
        name: `${addressData.firstName} ${addressData.lastName}`,
        address: `${addressData.address}, ${addressData.city}, ${addressData.state}, ${addressData.country}`,
      }),
    });

    if (!validateResponse.ok) {
      throw new Error("Address validation API request failed");
    }

    const validateData = await validateResponse.json();
    const receiverAddressCode = validateData.data.address_code;

    const currentDate = new Date().toISOString().split("T")[0];

    // Second API call to fetch shipping rates
    const fetchRatesResponse = await fetch(fetchRatesApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        sender_address_code: 11398720,
        reciever_address_code: receiverAddressCode,
        pickup_date: currentDate,
        category_id: 74794423,
        package_items: formattedItems,
        package_dimension: {
          length: 12,
          width: 10,
          height: 10,
        },
        delivery_instructions: deliveryNotes,
      }),
    });

    const fetchRatesData = await fetchRatesResponse.json();

    if (!fetchRatesResponse.ok) {
      console.error(
        "Fetch Rates API Error:",
        JSON.stringify(fetchRatesData, null, 2)
      );
      throw new Error(
        `Fetch rates API request failed: ${
          fetchRatesData.message || "Unknown error"
        }`
      );
    }

    // Extract the required information from the response
    const requestToken = fetchRatesData.data.request_token;
    const fastestCourier = fetchRatesData.data.fastest_courier;
    const cheapestCourier = fetchRatesData.data.cheapest_courier;

    // console.log("Request Token:", requestToken);
    // console.log("Fastest Courier:", JSON.stringify(fastestCourier, null, 2));
    // console.log("Cheapest Courier:", JSON.stringify(cheapestCourier, null, 2));

    // Function to choose between fastest and cheapest courier
    const chosenCourier = () => {
      return Math.random() > 0.5 ? fastestCourier : cheapestCourier;
    };

    const { service_code, courier_id } = chosenCourier();

    // Third API call to create shipping label
    const createLabelResponse = await fetch(createLabelApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        request_token: requestToken,
        service_code: service_code,
        courier_id: courier_id,
      }),
    });

    const createLabelData = await createLabelResponse.json();

    if (!createLabelResponse.ok) {
      console.error(
        "Create Label API Error:",
        JSON.stringify(createLabelData, null, 2)
      );
      throw new Error(
        `Create label API request failed: ${
          createLabelData.message || "Unknown error"
        }`
      );
    }

    if (createLabelData.status === "success") {
      const { shipping_fee, tracking_url, order_id, status } =
        createLabelData.data.payment;

      // Return both validate and fetch rates data along with the label data
      return NextResponse.json({
        validateData,
        fetchRatesData,
        requestToken,
        fastestCourier,
        cheapestCourier,
        shipping_fee,
        tracking_url,
        order_id,
        status,
      });
    } else {
      console.error(
        "Create Label API Error:",
        JSON.stringify(createLabelData, null, 2)
      );
      return NextResponse.json(
        { message: "Failed to create label", error: createLabelData.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request", error },
      { status: 500 }
    );
  }
}
