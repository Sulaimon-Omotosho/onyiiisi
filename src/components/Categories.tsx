"use client";

import { useEffect, useState } from "react";
import { collection } from "@/lib/sanity-client";
import { CollectionsProps } from "@/lib/types";
import { MoveDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { topCategories } from "@/constants";
import PopularItems from "./PopularItems";

export default function Categories() {
  const [collectionData, setCollectionData] = useState<CollectionsProps[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await collection();
        setCollectionData(data);
      } catch (err) {
        console.error("Error fetching collections data:", err);
      }
    };
    fetchCollections();
  }, []);

  // Function to go to the next category
  const handleNext = () => {
    setCurrentCategoryIndex(
      (prevIndex) => (prevIndex + 1) % topCategories.length
    );
  };

  // Function to go to the previous category
  const handlePrev = () => {
    setCurrentCategoryIndex((prevIndex) =>
      prevIndex === 0 ? topCategories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold md:font-bold uppercase text-center mb-4">
        Top Categories
      </h1>

      <div className="p-18 xl:p-20">
        {/* Mobile View - Single Category with navigation */}
        <div className="md:hidden relative flex justify-center items-center">
          <button
            onClick={handlePrev}
            className="absolute left-2 text-black  p-2 rounded-full z-10"
          >
            {"<"}
          </button>

          <div className="w-[352px] h-[267px] relative flex justify-center items-center overflow-hidden rounded-lg">
            <Link href={topCategories[currentCategoryIndex].slug}>
              <Image
                src={topCategories[currentCategoryIndex].image}
                alt={topCategories[currentCategoryIndex].title}
                fill
                className="object-cover transform hover:scale-110 transition-transform ease-in-out duration-500 rounded-lg"
              />
            </Link>
            <div className="absolute text-center">
              <h3 className="capitalize text-white bg-[rgb(95,40,74)] rounded-full py-2 px-4 lg:py-3 text-2xl font-thin">
                {topCategories[currentCategoryIndex].title}
              </h3>
              <Link
                href={topCategories[currentCategoryIndex].slug}
                className="hidden md:block"
              >
                <button className="text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2">
                  learn more
                  <span>
                    <MoveDownRight className="w-4 lg:w-5 h-4 lg:h-5 pt-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-2 text-black  p-2 rounded-full z-10"
          >
            {">"}
          </button>
        </div>

        {/* Large Screens View */}
        <div className="hidden md:block overflow-hidden">
          <div className="whitespace-nowrap animate-scroll flex gap-6">
            {topCategories.map((category, idx) => (
              <div
                key={idx}
                className="w-[352px] lg:w-[470px] xl:w-[628px] h-[267px] lg:h-[356px] xl:h-[475px] relative flex justify-center items-center overflow-hidden rounded-lg"
              >
                <Link href={category.slug}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transform hover:scale-110 transition-transform ease-in-out duration-500 rounded-lg"
                  />
                </Link>
                <div className="absolute text-center">
                  {/* <h3 className="capitalize text-white text-2xl font-thin pb-2">  
                  </h3> */}
                  <Link href={category.slug} className="hidden md:block">
                    <button className="text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2">
                      {category.title}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections - Displaying first two collections */}
        <div className="flex flex-col md:flex-row items-center md:justify-evenly mt-10 gap-6">
          {collectionData.slice(0, 2).map((collection, index) => (
            <div
              key={collection._id}
              className="w-[352px] lg:w-[470px] xl:w-[628px] h-[267px] lg:h-[356px] xl:h-[475px] relative flex justify-center items-center overflow-hidden rounded-lg"
            >
              <Link href={`/shop/collections/${collection.title}`}>
                <Image
                  src={index === 0 ? "/Trending.jpg" : "/Limited.jpg"}
                  alt={collection.title}
                  fill
                  className="object-cover transform hover:scale-110 transition-transform ease-in-out duration-500 rounded-lg"
                />
              </Link>
              <div className="absolute text-center">
                <h3 className="capitalize text-white text-lg font-semibold py-2 px-6 bg-[rgb(95,40,74)] rounded-full">
                  {collection.title}
                </h3>
                <Link
                  href={`/shop/collections/${collection.title}`}
                  className="hidden md:block"
                >
                  {/* Button commented out in the original code */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New section for the provided image */}
      <div className="px-6 py-8 md:p-18 xl:px-20 xl:py-16">
        {/* Adjust padding for mobile screens */}
        <div className="flex flex-col items-center md:flex-row justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0 md:p-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
              Discover Exquisite Jewellery Crafted 22 - 24k Gold And Platinum
            </h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              tincidunt diam eu sem. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Fusce tincidunt diam eu sem. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/Edited.jpg"
              alt="Exquisite Jewellery"
              width={500} // Set a smaller width for mobile
              height={400} // Adjust height proportionally
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="p-12 bg-[rgb(56,22,10)]">
        <div className="flex justify-center text-white md:justify-between">
          <h3 className="uppercase text-3xl md:text-xl font-bold md:font-semibold">
            Popular items
          </h3>
          <Link href="/shop">
            <button className="hidden py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs md:flex items-center justify-center gap-1 lg:gap-2 border-2 border-white">
              learn more
              <span>
                <MoveDownRight className="w-4 lg:w-5 h-4 lg:h-5 pt-1" />
              </span>
            </button>
          </Link>
        </div>
        <PopularItems />
      </div>
    </div>
  );
}
