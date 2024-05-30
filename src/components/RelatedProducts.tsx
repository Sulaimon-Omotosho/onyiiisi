"use client";

import { ChevronLeft, ChevronRight, MoveUp } from "lucide-react";
import Image from "next/image";
import { productsByDetails, urlFor } from "@/lib/sanity-client";
import { ProductProps } from "@/lib/types";
import { salesCarousel } from "@/constants";
import { useState, useEffect } from "react";
import Loading from "./Loading";

interface RelatedProductProps {
  productDetails: {
    gram: number;
    price: number;
    ratings: number;
  };
}

export default function RelatedProducts({
  productDetails,
}: RelatedProductProps) {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const related = await productsByDetails(
          productDetails.gram,
          productDetails.price,
          productDetails.ratings
        );
        console.log("Related Products:", related);
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [productDetails]);

  const prevSale = () => {
    const isFirstSale = currentIndex === 0;
    const newIndex = isFirstSale ? salesCarousel.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSale = () => {
    const isLastSale = currentIndex === salesCarousel.length - 1;
    const newIndex = isLastSale ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[rgb(56,22,10)] my-10 py-5 ">
      <h1 className="text-lg md:text-2xl text-white font-bold p-5 uppercase">
        Related products
      </h1>
      <div className="flex flex-col md:flex-row justify-around content-center items-center relative  ">
        {relatedProducts.map((product, idx) => (
          <div
            key={product._id}
            className="hidden md:flex flex-col items-center"
          >
            <div className="relative h-[225px] lg:h-[300px] xl:h-[400px] w-[213px] lg:w-[284px] xl:w-[379px] overflow-hidden rounded-xl ">
              <Image
                src={urlFor(product.placeholder).url()}
                alt={product.title}
                fill
                className="transform hover:scale-110 transition-transform ease-in-out duration-500 object-cover"
              />
              <div className="bg-white absolute left-3 top-6 ">
                <p className="px-3 capitalize py-[2px]">{product.title}</p>
              </div>
            </div>
            <div className="flex text-white flex-col gap-1 mt-2 w-[213px] lg:w-[284px] xl:w-[379px]">
              <p className=" font-semibold text-sm w-[80%]">
                {product.description}
              </p>
              <p className="text-xs font-thin">{product.gram}</p>
              <p className=" text-green-700 flex flex-row text-lg text-semibold">
                <MoveUp className="text-green-700 w-5 h-[13px] mt-2" />$
                {product.price}
              </p>
            </div>
          </div>
        ))}
        {/* <ChevronLeft className='absolute left-0 cursor-pointer hover:scale-150 ease-in-out duration-300' />
      <ChevronRight className='absolute right-0 cursor-pointer hover:scale-150 ease-in-out duration-300' /> */}

        {/* Mobile  */}
        {relatedProducts.map((product, idx) => (
          <div
            key={idx}
            className={`md:hidden flex flex-col items-center ${
              idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <div className="relative h-[300px] w-[280px] overflow-hidden rounded-xl ">
              <Image
                src={urlFor(product.placeholder).url()}
                alt={product.title}
                fill
                className="transform hover:scale-110 transition-transform ease-in-out duration-500 flex-grow object-cover"
              />
              <div className="bg-white absolute left-3 top-6">
                <p className="px-3 capitalize py-[2px]">{product.title}</p>
              </div>
            </div>
            <div className="flex text-white flex-col gap-1 w-[359px] mt-2">
              <p className=" font-semibold text-sm w-[80%]">
                {product.description}
              </p>
              <p className="text-xs font-thin">{product.gram}</p>
              <p className=" text-green-700 flex flex-row text-lg text-semibold">
                <MoveUp className="text-green-700 w-5 h-[13px] mt-2" />$
                {product.price}
              </p>
            </div>
          </div>
        ))}
        <ChevronLeft
          onClick={prevSale}
          className="absolute left-3 cursor-pointer hover:scale-150 ease-in-out text-white duration-300"
        />
        <ChevronRight
          onClick={nextSale}
          className="absolute right-3 text-white cursor-pointer hover:scale-150 ease-in-out duration-300"
        />
      </div>
    </div>
  );
}
