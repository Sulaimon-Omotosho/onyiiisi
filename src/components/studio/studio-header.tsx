"use client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudioHeader(props: any) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <header>
        <div className="p-5 bg-black text-gray-100 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold hover:text-blue-600 duration-200"
          >
            <Undo2 className="text-2xl" /> Back to Home
          </Link>
          <h1 className="font-bold text-2xl italic text-center">Onyiisi</h1>
          <p className="text-sm">Admin Panel CMS</p>
        </div>
        {props.renderDefault(props)}
      </header>
    )
  );
}
