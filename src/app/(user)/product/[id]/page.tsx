"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { addToCart } from "@/redux/cart-slice";
import { useDispatch } from "react-redux";
import { ProductProps } from "@/lib/types";
import { detailsImg } from "@/constants";
import { ChevronLeft, ChevronRight, Heart, Share2, Star } from "lucide-react";
import DetailsDescription from "@/components/DetailsDescription";
import RelatedProducts from "@/components/RelatedProducts";
import { urlFor } from "@/lib/sanity-client";
import { product } from "@/constants";

const SingleProductPage = ({ products }: { products: ProductProps[] }) => {
  const dispatch = useDispatch();
  // Carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToImg = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Price
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      _id: products[0]._id,
      title: products[0].title,
      price: products[0].price,
      categoryName: products[0].categoryName,
      brand: products[0].brand,
      quantity: quantity,
    };
    console.log(cartItem);
    dispatch(addToCart(cartItem));
  };

  const getImageUrl = (imageRef: string) => {
    return urlFor(imageRef).url();
  };

  return (
    <div className="py-5 lg:py-20">
      <div className=" px-5 lg:px-16 xl:px-28">
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
            <p className="font-semibold"> Details</p>
          </div>
        </div>

        {/* Image and details  */}

        <div className="flex flex-col md:flex-row gap-10 flex-grow">
          {/* Image Carousel  */}
          <div className="flex-1">
            {detailsImg.map((img, idx) => (
              <div
                key={idx}
                className={`relative h-[350px] lg:h-[450px] xl:h-[550px] w-[350px] lg:w-[450px] xl:w-[550px] transition duration-500 ${
                  idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <Image
                  src={img.img}
                  alt="Earring"
                  fill
                  className={`absolute object-cover rounded-md ${img.trans}`}
                />
              </div>
            ))}
            <div className="relative py-6 flex gap-4 justify-center w-[350px] lg:w-[450px] xl:w-[550px]">
              {detailsImg.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => goToImg(idx)}
                  className="relative h-20 w-20 hover:scale-110 hover:shadow-md ease-in-out transition duration-500 cursor-pointer "
                >
                  <Image
                    src={img.img}
                    alt="Earrings"
                    fill
                    className={`rounded-md object-cover ${img.trans}`}
                  />
                </div>
              ))}
              <div className="hidden lg:flex justify-center items-center">
                <ChevronLeft className="absolute left-0 text-gray-600 hover:scale-150 transition-all duration-500 cursor-pointer" />
                <ChevronRight className="absolute right-0 text-gray-600 hover:scale-150 transition-all duration-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Details  */}
          <div className="flex-1 flex flex-col gap-8 justify-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-4xl font-semibold capitalize">
                {product[0].title}
              </h2>
              <p className="text-orange-800 text-xl md:text-2xl font-semibold">
                ${parseFloat(product[0].price).toFixed(2)}
              </p>
              <p className="text-gray-500 font-thin text-sm md:text-md capitalize">
                {product[0].size} Grams
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-xs md:text-sm">
                {product[0].description}
              </p>
              <div className="flex gap-4 py-2">
                <div className="flex gap-1">
                  <Star
                    style={{ fill: "rgb(244,206,80)" }}
                    color="rgb(244,206,80)"
                  />
                  <Star
                    style={{ fill: "rgb(244,206,80)" }}
                    color="rgb(244,206,80)"
                  />
                  <Star
                    style={{ fill: "rgb(244,206,80)" }}
                    color="rgb(244,206,80)"
                  />
                  <Star
                    style={{ fill: "rgb(244,206,80)" }}
                    color="rgb(244,206,80)"
                  />
                  <Star
                    style={{ fill: "rgb(244,206,80)" }}
                    color="rgb(244,206,80)"
                  />
                </div>
                <p className="text-gray-800">(356 Reviews)</p>
                <Heart className="cursor-pointer" />
                <Share2 className="cursor-pointer" />
              </div>
              <hr className="border-b-2 border-gray-600" />
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex justify-between">
                <p className="text-lg md:text-2xl capitalize">Quantity</p>
                <div className="text-2xl flex">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    -
                  </button>{" "}
                  <p className="w-10 text-center">{quantity}</p>{" "}
                  <button
                    onClick={() =>
                      setQuantity((next) => (next < 10 ? next + 1 : 10))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="text-white bg-[rgb(95,40,74)] py-2 lg:py-5 mx-5 rounded-full uppercase font-thin flex items-center justify-center gap-1 lg:gap-2 "
              >
                add to cart
              </button>
              <p className="capitalize cursor-pointer underline underline-offset-2 md:text-2xl font-semibold text-center">
                write a review
              </p>
            </div>
          </div>
        </div>

        {/* Description Reviews Specification  */}
        <DetailsDescription />
      </div>
      {/* Related Products  */}
      <RelatedProducts />
    </div>
  );
};

export default SingleProductPage;
