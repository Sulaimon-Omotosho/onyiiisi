"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { countries } from "@/constants";
import { checkouts } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { urlFor } from "@/lib/sanity-client";
import { useSearchParams } from "next/navigation";
import { usePaystackPayment } from "react-paystack";

interface ProductData {
  name: string;
  description: string;
  placeholder: any;
}

interface CheckoutItem {
  quantity: number;
  price: number;
  brand: string;
  gram: number;
  product_data: ProductData;
}

const CheckOutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  // const parsedItems: { updatedItems: CheckoutItem[] } = order
  //   ? JSON.parse(order as string)
  //   : { updatedItems: [] };
  const parsedItems: CheckoutItem[] = order ? JSON.parse(order as string) : [];
  console.log(parsedItems);
  const [userEmail, setUserEmail] = useState("");
  // const updatedItems: CheckoutItem[] = parsedItems.updatedItems || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    postalCode: "",
    city: "",
    country: "",
    deliveryNotes: "",
  });

  const handleFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmission = async () => {
    const { address, state, city, country, phoneNumber, firstName } = formData;

    if (!address || !state || !city || !country || !phoneNumber || !firstName) {
      toast("Please fill in all required address fields");
      return;
    }

    try {
      setIsLoading(true);
      const addressData = {
        address: formData.address,
        state: formData.state,
        city: formData.city,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        firstName: formData.firstName,
      };

      const response = await fetch("/api/gig-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addressData, parsedItems }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data from GIGGetStations
        console.log(data);
      } else {
        // Handle error
        console.error("Error fetching stations");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast("An unexpected error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  // const passkey = process.env.PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: totalPrice * 100,
    publicKey: `${process.env.PAYSTACK_KEY}`,
  };

  const onSuccess = (reference: any) => {
    const trxref = reference.trxref;
    router.push("/history");
  };

  const onClose = () => {
    router.push("/history");
    console.log("Payment modal closed");
  };

  const initializePayment = usePaystackPayment(config);

  const isFormFilled = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      state,
      postalCode,
      city,
      country,
      deliveryNotes,
    } = formData;
    return (
      firstName &&
      lastName &&
      phoneNumber &&
      email &&
      address &&
      state &&
      postalCode &&
      city &&
      country &&
      deliveryNotes
    );
  };

  const handlePlaceOrder = async () => {
    if (!isFormFilled()) {
      toast("Please fill the shipping address form.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: parsedItems,
          billingInfo: formData,
          paymentMethod,
        }),
      });

      if (response.ok) {
        const { order } = await response.json();
        toast("Order created successfully");
        // Trigger Paystack payment
        initializePayment({ onSuccess, onClose });
      } else {
        toast("Error placing order.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = parsedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [parsedItems]);

  return (
    <div className="pt-5 md:pt-20 px-5 xl:px-10">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-2 lg:pt-20">
        <div className="flex-1 xl:px-20">
          <h1 className="uppercase text-3xl font-bold">Billing Information</h1>
          <form
            className=" flex flex-col gap-3 mt-3 w-full"
            onSubmit={handleAddressSubmission}
          >
            <div className="relative py-[10px]">
              <label
                htmlFor="firstName"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="lastName"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="phoneNumber"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="email"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="address"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="flex gap-5">
              <div className="relative py-[10px] flex-1">
                <label
                  htmlFor="state"
                  className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  required
                  className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
                />
              </div>
              <div className="relative py-[10px] flex-1">
                <label
                  htmlFor="postalCode"
                  className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleFormChange}
                  required
                  className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
                />
              </div>
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="city"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                required
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              />
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="country"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Country
              </label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleFormChange}
                className="border-[1px]  border-gray-300 rounded-sm p-3 w-full"
              >
                {countries.map((country, idx) => (
                  <option key={idx} value={country}>
                    {country}
                  </option>
                ))}
              </select>{" "}
            </div>
            <div className="relative py-[10px]">
              <label
                htmlFor="notes"
                className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
              >
                Delivery Notes
              </label>
              <textarea
                name="deliveryNotes"
                id="deliveryNotes"
                value={formData.deliveryNotes}
                onChange={handleFormChange}
                className="border-[1px]  border-gray-300 rounded-sm p-3 h-32 w-full"
              />
            </div>
          </form>
          <button
            type="submit"
            onClick={handleAddressSubmission}
            className="text-white bg-[rgb(95,40,74)] py-1 lg:py-2 w-[250px] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 cursor-pointer mb-10"
          >
            Confirm Address
          </button>
        </div>
        <div className="relative flex-1 border-2 p-5 border-gray-400 rounded-lg h-[1000px]">
          <div className="">
            <h1 className="uppercase text-2xl font-bold py-2 ">your order</h1>
            <hr className="border-slate-400" />
          </div>
          <div className="h-full overflow-hidden">
            <div className="h-1/2 overflow-y-auto">
              {parsedItems.map((item, idx) => (
                <div key={idx} className="">
                  <div className="py-5 flex flex-col lg:flex-row gap-2 xl:gap-5">
                    <div className="w-1/4">
                      <div className="relative h-[100px] xl:h-[130px] w-[100px] xl:w-[150px] rounded-md overflow-hidden border-2 border-slate-400">
                        <Image
                          src={urlFor(item?.product_data.placeholder).url()}
                          alt={item.product_data.name}
                          fill
                          // height={150}
                          // width={150}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-full lg:w-3/4 py-3">
                      <div className="flex flex-col ml-3 justify-between">
                        <h3 className="capitalize text-xl lg:text-2xl font-semibold">
                          {item.product_data.name}
                        </h3>
                        <p className="text-md lg:text-xl text-gray-500 capitalize">
                          {item.brand} | {item.gram} Grams
                        </p>{" "}
                        <p className="text-md lg:text-xl text-gray-500 capitalize">
                          Quantity:{" "}
                          <span className="text-black text-2xl">
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                      <h3 className="text-2xl mr-3 lg:text-3xl font-bold text-green-800">
                        ${item.price}
                      </h3>
                    </div>
                  </div>
                  <hr className="border-slate-400" />
                </div>
              ))}
            </div>
            <div className="h-1/2 my-5">
              <div className="relative flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  placeholder="enter discount code"
                  className="relative border-[1px]  border-gray-300 uppercase rounded-full p-3 w-full bg-gray-300"
                />
                <button
                  type="submit"
                  className="right-1 lg:absolute uppercase bg-[rgb(95,40,74)] text-white text-md py-2 px-5 rounded-full"
                >
                  apply discount
                </button>
              </div>
              <div className="mt-[50px] lg:mt-[100px]">
                <p className="flex justify-between uppercase text-xl font-semibold text-slate-400">
                  subtotal{" "}
                  <span className="text-black">${totalPrice.toFixed(2)}</span>
                </p>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div>
                    <p className="flex justify-between uppercase text-xl font-semibold text-slate-400">
                      shipping <span className="text-black">$340</span>
                    </p>
                  </div>
                )}
                <hr className="my-2" />
                <p className="flex justify-between uppercase text-xl font-semibold text-slate-400 mt-4">
                  total{" "}
                  <span className="text-black">
                    ${(totalPrice + 340).toFixed(2)}
                  </span>
                </p>
                <hr className="my-2" />
              </div>
              <form className="my-6 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value="paypal"
                    className="h-5 w-5"
                    checked={paymentMethod === "paypal"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="online" className="capitalize text-slate-600">
                    Pay with PayPal
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="bank"
                    value="stripe"
                    className="h-5 w-5"
                    checked={paymentMethod === "stripe"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="bank" className="capitalize text-slate-600">
                    Bank Card
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paystack"
                    value="paystack"
                    className="h-5 w-5"
                    checked={paymentMethod === "paystack"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="paystack"
                    className="capitalize text-slate-600"
                  >
                    Paystack
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-center">
        <button
          type="submit"
          onClick={handlePlaceOrder}
          className="text-white bg-[rgb(95,40,74)] py-1 lg:py-2 w-[250px] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 cursor-pointer mb-10"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
