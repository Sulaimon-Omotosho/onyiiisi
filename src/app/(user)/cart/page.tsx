"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { StateProps } from "@/lib/types";
import { addToWishlist } from "@/redux/wishlist-slice";
import {
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/cart-slice";
import { urlFor } from "@/lib/sanity-client";

interface CartItem {
  _id: string;
}

const CartPage = () => {
  const { productData } = useSelector((state: StateProps) => state.cart);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  return (
    <>
      {productData?.length > 0 ? (
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
                  {item.image && (
                    <Image
                      src={urlFor(item?.image).url()}
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
                        {item?.title.substring(0, 20)}{" "}
                        <span>{item?.description}</span>
                      </h3>
                      <p className="capitalize text-sm lg:text-lg text-gray-500">
                        {item.brand} | {item.size} grams
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-orange-800">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex gap-5 px-3 items-center justify-between border-[1px] rounded-md border-gray-500 w-fit h-fit text-2xl text-gray-500">
                    <button
                      onClick={() => {
                        dispatch(decreaseQuantity({ _id: item?._id }));
                        toast.success("Product reduced successully");
                      }}
                    >
                      -
                    </button>
                    <p className="">{item?.quantity}</p>
                    <button
                      onClick={() => {
                        dispatch(increaseQuantity({ _id: item?._id }));
                        toast.success("Product added successully");
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
                          toast.success(
                            `${item?.title.substring(
                              0,
                              12
                            )}... removed from cart`
                          );
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

          {/* CheckOut  */}
          <div className="flex flex-col items-center">
            <div className="m-10 rounded-md w-[95%] md:w-[80%] lg:w-[70%] flex justify-between bg-gray-200 p-4">
              <p className="uppercase text-gray-500 text-xl">item subtotal</p>
              <p className="text-xl">${totalAmt.toFixed(2)}</p>
            </div>
            <button className="text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[75%] md:w-[50%] lg:w-[30%] cursor-pointer rounded-full uppercase font-bold text-md flex items-center justify-center gap-1 lg:gap-2 ">
              <Link href="/checkout">proceed to checkout</Link>
            </button>
            <Link
              href="/shop"
              className="uppercase font-semibold hover:underline py-5 underline-offset-8 text-gray-700"
            >
              continue shopping
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default CartPage;
