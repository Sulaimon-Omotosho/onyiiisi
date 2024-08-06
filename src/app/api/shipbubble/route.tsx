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
  const checkWalletBudgetUrl = `${process.env.SB_BASE_URL}/shipping/wallet/balance`;
  const bearerToken = process.env.SB_PASSKEY;

  if (
    !validateApiUrl ||
    !fetchRatesApiUrl ||
    !checkWalletBudgetUrl ||
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
    // First API call to check wallet balance
    const walletResponse = await fetch(checkWalletBudgetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!walletResponse.ok) {
      throw new Error("Wallet balance API request failed");
    }

    const walletData = await walletResponse.json();
    const walletBalance = walletData.data.balance;

    if (walletBalance < 0) {
      // You can set a minimum balance threshold here
      return NextResponse.json(
        { message: "Insufficient wallet balance" },
        { status: 400 }
      );
    }

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
    console.log(receiverAddressCode);

    const currentDate = new Date().toISOString().split("T")[0];

    // Second API call to fetch shipping rates
    const fetchRatesResponse = await fetch(fetchRatesApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        sender_address_code: 30512922,
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

    // Function to choose between fastest and cheapest courier
    const chosenCourier = () => {
      return Math.random() > 0.5 ? fastestCourier : cheapestCourier;
    };

    const { service_code, courier_id, total } = chosenCourier();

    // Return the total from the chosen courier
    return NextResponse.json({
      validateData,
      fetchRatesData,
      requestToken,
      service_code,
      courier_id,
      total,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request", error },
      { status: 500 }
    );
  }
}
