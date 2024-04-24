"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { OrderDoc } from "@/models/Order";

interface HistoryPageProps {
  initialOrders?: OrderDoc[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ initialOrders = [] }) => {
  const [orders, setOrders] = useState<OrderDoc[]>(initialOrders);
  const { status } = useSession();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await fetch("/api/history");
        if (res.ok) {
          const data: OrderDoc[] = await res.json();
          setOrders(data);
        } else {
          console.error("Error fetching order history:", res.statusText);
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching order history:", err);
        setOrders([]);
      }
    };

    if (status === "authenticated") {
      fetchOrderHistory();
    }
  }, [status]);

  return (
    <div className="lg:py-20">
      <div className="px-5 md:px-10 lg:px-20 py-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-center uppercase">
          history detail
        </h1>
        <div className="flex flex-col gap-16 py-10 w-full">
          {orders.map((order, idx) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row gap-5 lg:gap-10 md:items-center"
            >
              <div className="relative h-[180px] md:h-[250px] lg:h-[370px] w-[180px] lg:w-[370px] md:w-[250px] border-[1px] border-gray-500 rounded-md">
                {/* Replace with order image or a placeholder */}
                <Image
                  src="/placeholder.jpg"
                  alt="Order Image"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="text-slate-600 w-full md:w-3/4 flex flex-col gap-2">
                <p className="flex capitalize justify-between md:text-lg font-semibold w-full">
                  {order.items[0].title}:{" "}
                  {order.items[0].product_data?.name || order.items[0].brand}
                  <Link
                    href={`history/${order._id}`}
                    className="capitalize md:text-lg font-medium hover:underline underline-offset-4"
                  >
                    view details
                  </Link>
                </p>
                <p className="font-bold md:text-lg">
                  Order ID:-{" "}
                  <span className="text-black font-thin">{order._id}</span>
                </p>
                <p className="md:text-lg font-bold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <Link
                  href="status"
                  className="text-purple-950 font-semibold capitalize"
                >
                  {order.status}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
