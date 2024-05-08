"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface OrderItem {
  quantity: number;
  price: number;
  title: string;
  brand?: string;
  gram?: string;
}

interface Order {
  shippingAddress: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    deliveryNotes?: string;
  };
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  email: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");

  // const fetchOrderDetails = async (orderId: string) => {
  //   try {
  //     const response = await fetch("/api/orders/details", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ orderId }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json(); // Check if JSON data is valid
  //       console.log("Order details fetched successfully:", data);
  //     } else if (response.status === 400) {
  //       console.error("Error: Invalid orderId.");
  //     } else {
  //       console.error(`Unexpected error: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during fetchOrderDetails:", error);
  //   }
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="lg:py-20">
      <div className="px-5 md:px-10 lg:px-20 py-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-center uppercase">
          history detail
        </h1>
        <div className="flex flex-col gap-16 py-10 w-full">
          {orders.map((order: Order, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-5 lg:gap-10 md:items-center"
            >
              {/* <div className='relative h-[180px] md:h-[250px] lg:h-[370px] w-[180px] lg:w-[370px] md:w-[250px] border-[1px] border-gray-500 rounded-md'>
                {order.items.map((item: OrderItem, itemIdx: number) => (
                  <div key={itemIdx} className='flex flex-col'>
                    <h3 className='text-lg font-semibold'>
                      {item.title.slice(0, 14)}
                    </h3>
                  </div>
                ))}
              </div> */}
              <div className=" text-slate-600 w-full md:w-3/4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="flex capitalize md:text-lg font-semibold w-full">
                    Order ID:{" "}
                    <span className="text-black pl-4 font-thin">
                      {order._id}
                    </span>
                  </p>
                  <Link
                    href={`/history/${order._id}`}
                    onClick={() => {}}
                    className="hover:text-blue-500"
                  >
                    View Details
                  </Link>
                </div>
                <p className="md:text-lg font-bold">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-purple-950 font-semibold capitalize">
                  Status: {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
