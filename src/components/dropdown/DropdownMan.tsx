// dropdown/DropdownMan.tsx

import Image from "next/image";

const DropdownMan = () => {
  return (
    <div className="flex-1 flex flex-row py-[50px] px-9 gap-[200px] absolute lg:fixed z-30 w-full bg-[rgb(71,28,13)]">
      {/* Image Section */}
      <div className="w-1/4">
        <Image
          src="/shop.png"
          alt="Men's Collection"
          width={300}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Links Section */}
      <div className="w-3/4 flex flex-col gap-2 text-slate-300">
        <a href="#" className="hover:text-orange-500">
          Tiepins
        </a>
        <a href="#" className="hover:text-orange-500">
          Cuffs
        </a>
        <a href="#" className="hover:text-orange-500">
          Brooches
        </a>
        <a href="#" className="hover:text-orange-500">
          Chains
        </a>
        <a href="#" className="hover:text-orange-500">
          Rings
        </a>
        <a href="#" className="hover:text-orange-500">
          Others
        </a>
      </div>
    </div>
  );
};

export default DropdownMan;
