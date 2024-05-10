"use client";

import { ChevronLeft, ChevronRight, MoveUp } from "lucide-react";
import Image from "next/image";
import { salesCarousel } from "@/constants";
import { useState } from "react";

export default function RelatedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="bg-[rgb(56,22,10)] my-10 py-5 ">
      <h1 className="text-lg md:text-2xl text-white font-bold p-5 uppercase">
        Related products
      </h1>
      <div className="flex flex-col md:flex-row justify-around content-center items-center relative  ">
        {salesCarousel.map((sale, idx) => (
          <div key={idx} className="hidden md:flex flex-col items-center">
            <div className="relative h-[225px] lg:h-[300px] xl:h-[400px] w-[213px] lg:w-[284px] xl:w-[379px] overflow-hidden rounded-xl ">
              <Image
                src={sale.image}
                alt={sale.title}
                fill
                className="transform hover:scale-110 transition-transform ease-in-out duration-500 object-cover"
              />
              <div className="bg-white absolute left-3 top-6 ">
                <p className="px-3 capitalize py-[2px]">{sale.title}</p>
              </div>
            </div>
            <div className="flex text-white flex-col gap-1 mt-2 w-[213px] lg:w-[284px] xl:w-[379px]">
              <p className=" font-semibold text-sm w-[80%]">{sale.desc}</p>
              <p className="text-xs font-thin">{sale.type}</p>
              <p className=" text-green-700 flex flex-row text-lg text-semibold">
                <MoveUp className="text-green-700 w-5 h-[13px] mt-2" />$
                {sale.price}
              </p>
            </div>
          </div>
        ))}
        {/* <ChevronLeft className='absolute left-0 cursor-pointer hover:scale-150 ease-in-out duration-300' />
      <ChevronRight className='absolute right-0 cursor-pointer hover:scale-150 ease-in-out duration-300' /> */}

        {/* Mobile  */}
        {salesCarousel.map((sale, idx) => (
          <div
            key={idx}
            className={`md:hidden flex flex-col items-center ${
              idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <div className="relative h-[300px] w-[280px] overflow-hidden rounded-xl ">
              <Image
                src={sale.image}
                alt={sale.title}
                fill
                className="transform hover:scale-110 transition-transform ease-in-out duration-500 flex-grow object-cover"
              />
              <div className="bg-white absolute left-3 top-6">
                <p className="px-3 capitalize py-[2px]">{sale.title}</p>
              </div>
            </div>
            <div className="flex text-white flex-col gap-1 w-[359px] mt-2">
              <p className=" font-semibold text-sm w-[80%]">{sale.desc}</p>
              <p className="text-xs font-thin">{sale.type}</p>
              <p className=" text-green-700 flex flex-row text-lg text-semibold">
                <MoveUp className="text-green-700 w-5 h-[13px] mt-2" />$
                {sale.price}
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
