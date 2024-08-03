"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { StateProps } from "@/lib/types";
import { addToWishlist } from "@/redux/wishlist-slice";
import { useSession } from "next-auth/react";
// import { useCheckout } from "@/hooks/useCheckout";
import Loading from "@/components/Loading";
import {
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/cart-slice";
import { useRouter } from "next/navigation";
import { urlFor } from "@/lib/sanity-client";

const CartPage = () => {
  const { data: session } = useSession();
  const { productData } = useSelector((state: StateProps) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [totalAmt, setTotalAmt] = useState(0);
  // const { createCheckout } = useCheckout();
  const [LoadingTimeout, setLoadingTimeout] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item?.price * item?.productQuantity;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(loadingTimer);
  }, [productData]);

  const createCheckout = async () => {
    if (session?.user) {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: productData,
            email: session?.user?.email,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error during checkout:", errorData);
          toast.error("Error during checkout. Please try again.");
          return;
        }
        const data = await response.json();
        const { updatedItems } = data;
        if (updatedItems) {
          // Highlight start
          // Store the data in sessionStorage
          sessionStorage.setItem("checkoutData", JSON.stringify(updatedItems));
          // Navigate to the checkout page without query parameters
          router.push("/checkout");
          // Highlight end
        } else {
          toast.error("Error during checkout. Please try again");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout. Please try again.");
      }
    } else {
      toast.error("Please sign in to make Checkout");
      router.push("/login");
    }
  };

  return (
    <>
      <div className="lg:py-20 px-3 md:px-10 xl:px-20">
        {/* Navigation */}
        <div className="flex py-10 justify-between items-center">
          <div className="flex gap-1">
            <Link className="text-gray-400 hover:text-gray-800" href="/">
              Home |{" "}
            </Link>
            <Link className="text-gray-400 hover:text-gray-800" href="/shop">
              Shop |{" "}
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-800"
              href="/shop/earrings"
            />
            <Link
              className="text-gray-400 hover:text-gray-800"
              href="/shop/earrings"
            >
              Earrings |{" "}
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-800"
              href="/product/test123"
            >
              Details |{" "}
            </Link>
            <p className="font-semibold"> Cart</p>
          </div>
        </div>
        {/* Items  */}
        {loading ? (
          <div className="h-[100%]">
            <Loading />
          </div>
        ) : productData?.length > 0 ? (
          <div className="flex-col flex gap-10">
            {productData.map((item) => (
              <div
                key={item?._id}
                className="flex gap-5 md:gap-10 items-center"
              >
                <Link
                  href={`/product/${item?.slug?.current}`}
                  className="relative w-[120px] md:w-[200px] lg:w-[350px] h-[120px] md:h-[200px] lg:h-[350px]"
                >
                  {item.placeholder && (
                    <Image
                      src={urlFor(item?.placeholder).url()}
                      alt="Earring"
                      fill
                      objectFit="cover"
                      className=" border-2 border-gray-600 rounded-md"
                    />
                  )}
                </Link>
                <div className="relative flex w-[70%] gap-4 lg:gap-8 flex-col">
                  <div className="flex justify-between">
                    <div className="">
                      <h3 className="md:text-lg lg:text-2xl text-gray-800 font-semibold capitalize lg:pb-2">
                        {item?.title}{" "}
                        <span className="text-gray-600 text-sm">
                          {item?.description}
                        </span>
                      </h3>
                      <p className="capitalize text-sm lg:text-lg text-gray-500">
                        {item.brand} | {item.gram} grams
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-orange-800">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex gap-5 px-3 items-center justify-between border-[1px] rounded-md border-gray-500 z-20 w-fit h-fit text-2xl text-gray-500">
                    <button
                      onClick={() => {
                        dispatch(decreaseQuantity({ _id: item?._id }));
                        toast.success("Product reduced successully");
                      }}
                    >
                      -
                    </button>
                    <p className="">{item.productQuantity}</p>
                    <button
                      onClick={() => {
                        dispatch(increaseQuantity({ _id: item?._id }));
                        toast.success("Product increased successully");
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="">
                    <hr className="border-gray-700 mb-3" />
                    <div className="px-5 flex justify-between items-center">
                      <button
                        onClick={() => {
                          dispatch(addToWishlist(item));
                          toast.success("added to wishlist");
                        }}
                        className="flex gap-1 text-[hsl(323,41%,26%)] font-semibold"
                      >
                        {" "}
                        <Heart />{" "}
                        <p className="hidden md:inline"> Move to Wishlist</p>
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteProduct(item._id));
                        }}
                        className="flex gap-1 text-gray-500 text-sm"
                      >
                        {" "}
                        <Trash size={18} />
                        <p className="hidden md:inline"> Remove</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[100%] flex flex-col gap-5 justify-center items-center">
            <p className="text-3xl font-bold">Cart Empty</p>
            <Link
              href="/shop"
              className=" hover:underline underline-offset-4 hover:font-semibold hover:scale-110 transition-all duration-300 "
            >
              Go To Shop
            </Link>
          </div>
        )}

        {/* CheckOut  */}
        <div className="flex flex-col items-center">
          <div className="m-10 rounded-md w-[95%] md:w-[80%] lg:w-[70%] flex justify-between bg-gray-200 p-4">
            <p className="uppercase text-gray-500 text-xl">item subtotal</p>
            <p className="text-xl">${totalAmt.toFixed(2)}</p>
          </div>
          <button
            onClick={createCheckout}
            className="text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[75%] md:w-[50%] lg:w-[30%] cursor-pointer rounded-full uppercase font-bold text-md flex items-center justify-center gap-1 lg:gap-2 "
          >
            <span>proceed to checkout</span>
          </button>
          {/* <Link
            href="/shop"
            className="uppercase font-semibold hover:underline py-5 underline-offset-8 text-gray-700"
          >
            continue shopping
            {item.image && (
              <Image
                src={urlFor(item.image).url()}
                alt="Earring"
                fill
                objectFit="cover"
                className=" border-2 border-gray-600 rounded-md"
              />
            )}
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default CartPage;
