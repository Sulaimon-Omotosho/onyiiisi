"use client";
import Image from "next/image";
import HeroCarousel from "./HeroCarousel";
import { Raleway, Noto_Sans_Georgian } from "next/font/google"; // Importing the fonts
import { BannerProps, GuaranteesProps } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { Filter, SearchIcon } from "lucide-react";
import { ProductProps } from "@/lib/types";
import { getAllProducts } from "@/lib/sanity-client";
import React, { useState, useEffect } from "react";

// Initializing the fonts
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700"], // Adjust weights as needed
});

const georgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero({
  banners,
  guarantees,
}: {
  banners: BannerProps[];
  guarantees: GuaranteesProps[];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filtered, setFiltered] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchValue(value);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(value)
    );
    setFiltered(filteredProducts);
  };

  return (
    <div className="py-0 lg:py-12 xl:py-16">
      <div className="flex justify-center relative">
        <div className="w-[80%] md:w-[50%] relative mt-5 md:mt-10">
          <SearchIcon className="absolute left-2 top-2 text-slate-400" />
          <input
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search Products..."
            className="inline p-2 rounded-full w-full bg-slate-100 pl-10"
          />
          <Filter className="absolute top-2 right-2 text-slate-400" />
        </div>
        {searchValue && (
          <div className="bg-white absolute z-50 -bottom-7 w-[80%]">
            {filtered.length > 0 ? (
              filtered.map(({ title, _id }) => <p key={_id}>{title}</p>)
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
      </div>

      {/* Hero Header */}
      <div className="px-5 md:px-10 lg:px-16 xl:px-20 uppercase text-2xl md:text-3xl lg:text-5xl xl:text-7xl mt-5">
        <h1 className={`${raleway.className} font-thin text-[rgb(95,40,74)]`}>
          radiating Luxury
        </h1>
        <h1 className={`${georgian.className} font-extrabold`}>
          one gleam at a time.
        </h1>
      </div>

      {/* Hero Image and Details */}
      <HeroCarousel banners={banners} />

      {/* Guarantees */}
      <div className="bg-[rgb(217,199,211)] my-12 flex flex-col md:flex-row items-center content-center gap-10 lg:gap-16 px-[35px] py-6 lg:px-[50px] xl:px-[100px] 2xl:px-[150px]">
        {guarantees?.map((guarantee, idx) => (
          <div
            key={guarantee._id}
            className=" flex-1 text-center flex flex-col gap-5 content-center items-center flex-grow"
          >
            <div className="h-20 w-20 relative">
              <Image
                src={urlFor(guarantee.image).url()}
                alt={guarantee.title}
                fill
              />
            </div>
            <div className="">
              <h2 className="font-bold text-lg lg:text-xl capitalize pb-1">
                {guarantee.title}
              </h2>
              <p className="text-sm">{guarantee.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
