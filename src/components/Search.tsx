"use client";
import React, { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductProps } from "@/lib/types";
import { getAllProducts } from "@/lib/sanity-client";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(!!searchValue);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  function handleSearch(term: string) {
    setSearchValue(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setShowDropdown(value.trim() !== "");
    handleSearch(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    Object.values(product)
      .join("")
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div
        onClick={handleSearchBar}
        className={`${searchBar ? "hidden" : "flex gap-1 cursor-pointer"}`}
      >
        <SearchIcon />
        <p className="text-slate-600">Search...</p>
      </div>
      <input
        value={searchValue}
        placeholder={placeholder}
        onChange={handleSearchValueChange}
        defaultValue={searchParams.get("query")?.toString()}
        className={`${
          searchBar ? "inline p-2 rounded-full bg-slate-100" : "hidden"
        }`}
      />

      {/* This is for dropdown */}
      <div className="bg-black absolute z-50">
        {filteredProducts.map((product) => (
          <div key={product._id}>
            <div>{product.title}</div>
            <div>
              {product.brand}
              <div>{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
