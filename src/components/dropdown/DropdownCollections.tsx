"use client";
import { useEffect, useState } from "react";
import { collection } from "@/lib/sanity-client";
import { CollectionsProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function DropdownCollections() {
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
    <div className="py-[50px] px-9 absolute z-30 w-full bg-[rgb(71,28,13)] flex gap-[200px]">
      <div className="w-[150px] lg:w-[202px] h-[108px] lg:h-[144px] relative rounded-md mr-14 overflow-hidden object-cover">
        <Image src="/shop.png" fill alt="collection image" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="capitalize font-medium underline text-center pb-3">
          Collections
        </h1>
        <ul className="text-center uppercase flex flex-col gap-2">
          {collectionData?.map((collection, idx) => (
            <li key={idx}>
              <Link href={`/shop/collections/${collection?.title}`}>
                {collection?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
