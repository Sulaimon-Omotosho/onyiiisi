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

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold md:font-bold uppercase text-center mb-4">
        Top Categories
      </h1>

      <div className="p-18 xl:p-20">
        {/* Custom CSS-based carousel for Top Categories */}
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-scroll flex gap-6">
            {topCategories.map((category, idx) => (
              <div
                key={idx}
                className="w-[352px] lg:w-[470px] xl:w-[628px] h-[267px] lg:h-[356px] xl:h-[475px] relative flex justify-center items-center overflow-hidden rounded-lg" // Added rounded-lg for border radius
              >
                <Link href={category.slug}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transform hover:scale-110 transition-transform ease-in-out duration-500 rounded-lg" // Added rounded-lg here as well
                  />
                </Link>
                <div className="absolute text-center">
                  <h3 className="capitalize text-white text-2xl font-thin pb-2">
                    {category.title}
                  </h3>
                  <Link href={category.slug} className="hidden md:block">
                    <button className="text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2">
                      learn more
                      <span>
                        <MoveDownRight className="w-4 lg:w-5 h-4 lg:h-5 pt-1" />
                      </span>
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
              className="w-[352px] lg:w-[470px] xl:w-[628px] h-[267px] lg:h-[356px] xl:h-[475px] relative flex justify-center items-center overflow-hidden rounded-lg" // Added rounded-lg here as well
            >
              <Link href={`/shop/collections/${collection.title}`}>
                <Image
                  src={index === 0 ? "/Trending.jpg" : "/Limited.jpg"}
                  alt={collection.title}
                  fill
                  className="object-cover transform hover:scale-110 transition-transform ease-in-out duration-500 rounded-lg" // Added rounded-lg here as well
                />
              </Link>
              <div className="absolute text-center">
                <h3 className="capitalize text-white text-2xl font-thin pb-2">
                  {collection.title}
                </h3>
                <Link
                  href={`/shop/collections/${collection.title}`}
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
          ))}
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
