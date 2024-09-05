"use client";

import { ShoppingCart, Heart, UserRound, Menu, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FlashingText from "./FlashText";
import { useState, useEffect } from "react";
import DropdownShop from "./dropdown/DropdownShop";
import DropdownMan from "./dropdown/DropdownMan";
import DropdownCollections from "./dropdown/DropdownCollections";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { data: session } = useSession();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  // Redux selectors for cart and wishlist counts
  const cartItemCount = useSelector((state: any) =>
    state.cart.productData.reduce(
      (acc: any, item: any) => acc + item.productQuantity,
      0
    )
  );
  const wishlistItemCount = useSelector((state: any) =>
    state.wishlist.productData.reduce(
      (acc: any, item: any) => acc + item.productQuantity,
      0
    )
  );

  // Toggle the mobile sidebar
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  // Fetch admin status
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch("/api/admin", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setIsAdminUser(data.isAdmin);
        }
      } catch (error) {
        console.error("Error fetching admin status", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle dropdown state
  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="relative bg-[rgb(56,22,10)] text-slate-300">
      <div
        className={`absolute w-full md:hidden transition-all duration-500 h-[100vh] z-40 ${
          sidebar ? "top-0 left-0" : "top-0 left-[-750px] shadow-none"
        }`}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      <div className="md:px-[40px] lg:px-[60px] h-20 border-b-[1px] border-slate-500 flex justify-between items-center z-20 lg:relative w-full bg-[rgb(56,22,10)]">
        {/* Mobile Layout */}
        <div className="flex md:hidden w-full justify-between items-center px-4">
          <div onClick={handleSidebar} className="z-10 cursor-pointer">
            <Menu className="w-10 h-10" />
          </div>
          <div className="flex-grow text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Onyiisi Logo"
                width={158}
                height={33}
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="cursor-pointer">
            {session ? (
              <Link href="/profile">
                <User className="w-8 h-8" />
              </Link>
            ) : (
              <Link href="/login">
                <User className="w-8 h-8" />
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex gap-5 lg:gap-10 flex-1 uppercase pl-10 w-full justify-start">
          <Link
            href="/man"
            onMouseEnter={() => handleMouseEnter("man")}
            className="cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200"
          >
            Man
          </Link>
          <Link
            href="/woman"
            onMouseEnter={() => handleMouseEnter("woman")}
            className="cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200"
          >
            Woman
          </Link>
          <Link
            href="/collection"
            onMouseEnter={() => handleMouseEnter("collection")}
            className="cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200"
          >
            Collection
          </Link>
        </div>

        {/* Center Logo */}
        <div className="hidden md:flex flex-1 md:flex-2 w-full text-center">
          <Link
            href="/"
            className="md:static absolute top-5 justify-center items-center w-full"
          >
            <Image
              src="/logo.svg"
              alt="Onyiisi Logo"
              width={158}
              height={33}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Right-aligned Links */}
        <div className="hidden md:flex gap-5 lg:gap-10 flex-1 uppercase pr-10 w-full justify-end">
          <Link
            href="/our-story"
            className="cursor-pointer items-center flex justify-center w-[119px] h-[31px] text-lg text-white py-1 hover:text-orange-500 ease-in-out duration-200"
          >
            Our Story
          </Link>
          <div className="relative">
            <Link href="/wish-list">
              <Heart className="cursor-pointer hidden md:block" />
            </Link>
            {wishlistItemCount > 0 && (
              <p className="absolute top-[-4px] right-[-6px] bg-[rgb(56,22,10)] text-white text-sm w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlistItemCount}
              </p>
            )}
          </div>
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="cursor-pointer hidden md:block" />
            </Link>
            {cartItemCount > 0 && (
              <p className="absolute top-[-4px] right-[-6px] bg-[rgb(56,22,10)] text-white text-sm w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartItemCount}
              </p>
            )}
          </div>
          {session ? (
            <Link href="/profile">
              <UserRound className="cursor-pointer hidden md:block" />
            </Link>
          ) : (
            <Link href="/login">
              <UserRound className="cursor-pointer mr-5" />
            </Link>
          )}
        </div>
      </div>
      <FlashingText
        text={[
          "Fast and Secure Shipping",
          "Worldwide Delivery",
          "Fast and Secure Shipping",
          "Worldwide Delivery",
          "Fast and Secure Shipping",
        ]}
        speed={50}
      />
      {/* Dropdown */}
      <div onMouseLeave={handleMouseLeave}>
        {activeDropdown === "man" && (
          <div className="absolute top-[100px] left-0 right-0 transition-opacity ease-in-out duration-200">
            <DropdownMan />
          </div>
        )}
        {activeDropdown === "woman" && (
          <div className="absolute top-[100px] left-0 right-0 transition-opacity ease-in-out duration-200">
            <DropdownShop />
          </div>
        )}
        {activeDropdown === "collection" && (
          <div className="absolute top-[100px] left-0 right-0 transition-opacity ease-in-out duration-200">
            <DropdownCollections />
          </div>
        )}
      </div>
    </header>
  );
}
