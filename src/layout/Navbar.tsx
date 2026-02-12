import { ShoppingBag } from "lucide-react";
import React from "react";

interface Props {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  homeRef: React.RefObject<HTMLElement>;
  dishesRef: React.RefObject<HTMLElement>;
  aboutRef: React.RefObject<HTMLElement>;
}

const Navbar = ({ scrollToSection, homeRef, dishesRef, aboutRef }: Props) => {
  return (
    <nav className="fixed top-4 md:top-6 inset-x-0 z-[100] px-4 md:px-6">
      <div className="container mx-auto max-w-6xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg rounded-full md:rounded-[32px] px-6 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection(homeRef)}
        >
          <div className="bg-orange-500 p-2.5 rounded-2xl text-white shadow-lg">
            <ShoppingBag size={20} />
          </div>
          <span className="text-xl md:text-2xl font-[1000] tracking-tighter">
            مطعمنا
          </span>
        </div>

        <div className="hidden md:flex gap-10 font-black text-sm text-gray-500 uppercase">
          <button
            onClick={() => scrollToSection(homeRef)}
            className="hover:text-orange-500 transition-colors cursor-pointer cursor-pointer"
          >
            الرئيسية
          </button>
          <button
            onClick={() => scrollToSection(dishesRef)}
            className="hover:text-orange-500 transition-colors cursor-pointer"
          >
            الأكثر طلباً
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="hover:text-orange-500 transition-colors cursor-pointer"
          >
            قصة نجاحنا
          </button>
        </div>

        <button className="bg-gray-900 text-white px-5 md:px-8 py-2.5 md:py-3.5 rounded-full md:rounded-[20px] text-sm md:text-base font-black hover:bg-orange-600 transition-all active:scale-95 cursor-pointer">
          اطلب الآن
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
