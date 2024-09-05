"use client";

import {
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  X,
  LogOut,
  NotebookText,
  Dot,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FlashingText from "./FlashText";
import { useState, useEffect } from "react";
import { Noto_Sans_Georgian } from "next/font/google";
import DropdownShop from "./dropdown/DropdownShop";
import DropdownMan from "./dropdown/DropdownMan";
import DropdownCollections from "./dropdown/DropdownCollections";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { isAdmin } from "@/lib/use-check";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";

const georgia = Noto_Sans_Georgian({ subsets: ["latin"] });

export default function Navbar() {
  const { data: session } = useSession();
  const [shopDropDown, setShopDropDown] = useState(false);
  const [manDropDown, setManDropDown] = useState(false);
  const [collectionDropDown, setCollectionDropDown] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

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

  const toggleShopDropdown = () => {
    setShopDropDown(!shopDropDown);
  };

  const toggleManDropdown = () => {
    setManDropDown(!manDropDown);
  };

  const toggleCollectionDropdown = () => {
    setCollectionDropDown(!collectionDropDown);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const session = await getSession();
        if (session) {
          console.log("Fetching admin status...");
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

  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  const pathname = usePathname();
  function pathMatch(route: string) {
    if (route === pathname) {
      return true;
    }
  }

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
            onMouseEnter={toggleManDropdown}
            className={`cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch("/man") && "text-orange-500 relative"
            }`}
          >
            Man
          </Link>
          <Link
            href="/woman"
            className={`cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch("/woman") && "text-orange-500 relative"
            }`}
            onMouseEnter={toggleShopDropdown}
          >
            Woman
          </Link>
          <Link
            href="/collection"
            className={`cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch("/collection") && "text-orange-500 relative"
            }`}
            onMouseEnter={toggleCollectionDropdown}
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
            className={`cursor-pointer items-center flex justify-center w-[119px] h-[31px] text-lg text-white  py-1 hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch("/our-story") && "text-orange-500 relative"
            }`}
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
      <div
        onMouseLeave={toggleShopDropdown}
        className={`${
          shopDropDown ? "absolute top-[100px] left-0 right-0" : "hidden"
        } transition-opacity ease-in-out duration-300 `}
      >
        <DropdownShop />
      </div>
      <div
        onMouseLeave={toggleManDropdown}
        className={`${
          manDropDown ? "absolute top-[100px] left-0 right-0" : "hidden"
        } transition-opacity ease-in-out duration-300 `}
      >
        <DropdownMan />
      </div>
      <div
        onMouseLeave={toggleCollectionDropdown}
        className={`${
          collectionDropDown ? "absolute top-[100px] left-0 right-0" : "hidden"
        } transition-opacity ease-in-out duration-300 `}
      >
        <DropdownCollections />
      </div>
    </header>
  );
}
