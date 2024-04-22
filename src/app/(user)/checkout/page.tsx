"use client";
import React, { useState } from "react";
import Image from "next/image";
import { countries } from "@/constants";
import { checkouts } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { urlFor } from "@/lib/sanity-client";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface ProductData {
  name: string;
  description: string;
  image: any;
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
  console.log("ParsedItems:", parsedItems);
  // const updatedItems: CheckoutItem[] = parsedItems.updatedItems || [];
  // console.log("updatedItems:", updatedItems);
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

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    if (!formData.address) {
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
          paymentMethod: paymentMethod,
        }),
      });

      if (response.ok) {
        const { order } = await response.json();

        // Initiate Flutterwave payment
        const flutterwaveResponse = await initializeFlutterwavePayment(
          order._id
        );

        if (flutterwaveResponse.status === "successful") {
          // Handle successful payment
          console.log("Payment successful");
          // Redirect to success page or update UI
        } else {
          // Handle payment error
          console.error("Payment error");
        }
      } else {
        // Handle error placing order
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initializeFlutterwavePayment = async (orderId: string) => {
    try {
      const response = await axios.post("/api/flutterwave", {
        orderId,
        // Add other required data for Flutterwave
      });

      return response.data;
    } catch (error) {
      console.error("Error initializing Flutterwave payment:", error);
      return {
        status: "error",
        message: "Error initializing Flutterwave payment",
      };
    }
  };
  return (
    <div className="pt-5 md:pt-20 px-5 xl:px-10">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-2 lg:pt-20">
        <div className="flex-1 xl:px-20">
          <h1 className="uppercase text-3xl font-bold">Billing Information</h1>
          <form className=" flex flex-col gap-3 mt-3 w-full">
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
                name="notes"
                id="notes"
                className="border-[1px]  border-gray-300 rounded-sm p-3 h-32 w-full"
              />
            </div>
          </form>
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
                          src={item.product_data.image}
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
                  subtotal <span className="text-black">$4000</span>
                </p>
                <p className="flex justify-between uppercase text-xl font-semibold text-slate-400">
                  shipping <span className="text-black">$340</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between uppercase text-xl font-semibold text-slate-400 mt-4">
                  total <span className="text-black">$4340</span>
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
                    id="transfer"
                    value="flutterwave"
                    className="h-5 w-5"
                    checked={paymentMethod === "flutterwave"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="transfer"
                    className="capitalize text-slate-600"
                  >
                    Flutterwave
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
