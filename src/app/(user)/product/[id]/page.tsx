"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/cart-slice";
import { addToWishlist } from "@/redux/wishlist-slice";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Star,
  MoveUp,
} from "lucide-react";
import { ProductProps } from "@/lib/types";
import { productById, productsByCategory, urlFor } from "@/lib/sanity-client";
import DetailsDescription from "@/components/DetailsDescription";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import WriteReview from "@/components/WriteReview";

const SingleProductPage = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [total, setTotal] = useState(73.4);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(true);

  // Review
  const [write, setWrite] = useState(false);
  const handleWrite = () => {
    setWrite(!write);
  };

  const closeReview = () => {
    setWrite(false);
  };
  useEffect(() => {
    if (typeof id === "string") {
      const fetchProduct = async () => {
        try {
          const product = await productById(id);
          setProduct(product);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching product:", err);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  console.log(product);

  // Carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToImg = (idx: number) => {
    setCurrentIndex(idx);
  };
  // useEffect(() => {
  //   setTotal(quantity * 73.4)
  // }, [quantity])

  // Descriptions

  return (
    <div className="py-5 lg:py-20">
      {loading ? (
        <Loading />
      ) : (
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
                {product?.categoryName} |{" "}
              </Link>
              <p className="font-semibold"> Details</p>
            </div>
          </div>

          {/* Image and details  */}

          <div className="flex flex-col md:flex-row gap-10 flex-grow">
            {/* Image Carousel  */}
            <div className="flex-1">
              {product?.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative h-[350px] lg:h-[450px] xl:h-[550px] w-[350px] lg:w-[450px] xl:w-[550px] transition duration-500 ${
                    idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  <Image
                    src={urlFor(img).url()}
                    alt="Earring"
                    fill
                    className={`absolute object-cover rounded-md ${img.trans}`}
                  />
                </div>
              ))}
              <div className="relative py-6 flex gap-4 justify-center w-[350px] lg:w-[450px] xl:w-[550px]">
                {product?.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => goToImg(idx)}
                    className="relative h-20 w-20 hover:scale-110 hover:shadow-md ease-in-out transition duration-500 cursor-pointer "
                  >
                    <Image
                      src={urlFor(img).url()}
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
                  {product?.title}
                </h2>
                <p className="flex flex-row gap-1 text-green-700 text-xl md:text-2xl font-semibold">
                  <MoveUp className="text-green-700 w-5 h-5 mt-2" />$
                  {product?.price}
                </p>
                <p className="text-gray-500 font-thin text-sm md:text-md capitalize">
                  {product?.gram} grams
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-xs md:text-sm">
                  {product?.description}
                </p>
                <div className="flex gap-4 py-2">
                  <div className="flex gap-1">
                    {(() => {
                      const stars = [];
                      for (let i = 0; i < (product?.ratings || 0); i++) {
                        stars.push(
                          <Star
                            key={`star_${i}`}
                            style={{ fill: "rgb(244,206,80)" }}
                            color="rgb(244,206,80)"
                          />
                        );
                      }
                      return stars;
                    })()}
                  </div>
                  <p className="text-gray-800">(356 Reviews)</p>
                  <Heart
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(addToWishlist(product));
                      toast.success("added to wishlist");
                    }}
                  />
                  <Share2 className="cursor-pointer" />
                </div>
                <hr className="border-b-2 border-gray-600" />
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex justify-between">
                  <p className="text-lg md:text-2xl capitalize">Quantity</p>
                  <div className="text-2xl flex w-14">
                    <button
                      onClick={() => {
                        dispatch(decreaseQuantity({ _id: product?._id }));
                        toast.success("Product reduced successully");
                        console.log(product);
                      }}
                    >
                      -
                    </button>{" "}
                    <p className="w-5 text-center">
                      {product?.productQuantity}
                    </p>{" "}
                    <button
                      onClick={() => {
                        dispatch(increaseQuantity({ _id: product?._id }));
                        toast.success("Product increased successully");
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(addToCart(product));

                    toast.success(
                      `${product?.title.substring(0, 12)}... added to cart`
                    );
                  }}
                  className="text-white bg-[rgb(95,40,74)] py-2 lg:py-5 mx-5 rounded-full uppercase font-thin flex items-center justify-center gap-1 lg:gap-2 "
                >
                  add to cart
                </button>
                <p
                  onClick={handleWrite}
                  className="capitalize cursor-pointer text-slate-500 hover:text-black hover:underline underline-offset-2 md:text-2xl font-semibold text-center transition-all duration-300"
                >
                  write a review
                </p>
              </div>
            </div>
          </div>
          {/* Description Reviews Specification  */}
          <DetailsDescription />
        </div>
      )}
      {/* Related Products  */}
      <RelatedProducts />
      <div className={`${write ? "absolute" : "hidden"} top-0 left-0 `}>
        <WriteReview closeReview={closeReview} />
      </div>
    </div>
  );
};

export default SingleProductPage;
