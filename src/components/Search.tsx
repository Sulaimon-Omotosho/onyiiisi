"use client";

import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const [text, setText] = useState('')
  // const [query] = useDebounce(text, 500)
  const [searchBar, setSearchBar] = useState(false);
  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // useEffect(() => {
  //   if (!query) {
  //     router.push(pathname)
  //   } else {
  //     router.push(`${pathname}?search=${query}`)
  //   }
  // }, [query, router])

  return (
    <div>
      <div
        onClick={handleSearchBar}
        className={` ${searchBar ? "hidden" : "flex gap-1 cursor-pointer"}`}
      >
        <SearchIcon />
        <p className="text-slate-600">Search...</p>
      </div>
      <input
        // value={text}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className={`${
          searchBar ? "inline p-2 rounded-full bg-slate-100" : "hidden"
        }`}
      />
    </div>
  );
};

export default Search;
