import { Play } from "lucide-react";
import React from "react";

interface Props {
  homeRef: React.RefObject<HTMLElement>;
  dishesRef: React.RefObject<HTMLElement>;
  scrollToSection: (
    ref: React.RefObject<HTMLElement>,
  ) => (e: React.MouseEvent) => void;
}

const HeroSection = ({ homeRef, dishesRef, scrollToSection }: Props) => {
  return (
    <section
      ref={homeRef}
      className="relative min-h-screen flex items-center pt-32 pb-20"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full font-bold text-sm border border-orange-100">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            نكهات عالمية على طاولتك
          </div>
          <h1 className="text-6xl lg:text-[88px] font-[900] leading-[0.9] text-gradient">
            نحن نقدم لك <br />
            <span className="text-orange-500">أفضل طعام</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-lg leading-relaxed font-medium">
            استمتع بتجربة طعام فريدة من نوعها مع أشهى الأطباق المحضرة بعناية وحب
            لتناسب ذوقك الرفيع.
          </p>
          <div className="flex flex-wrap gap-6">
            <button
              onClick={scrollToSection(dishesRef)}
              className="bg-gray-900 text-white px-12 py-5 rounded-[24px] font-black text-xl hover:translate-y-[-4px] transition-all shadow-2xl cursor-pointer"
            >
              القائمة
            </button>
            <button className="bg-orange-500 text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-orange-600 transition-all btn-shadow flex items-center gap-3  cursor-pointer">
              <Play size={20} fill="currentColor " /> احجز طاولة
            </button>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[120px] overflow-hidden shadow-2xl border-[12px] border-white z-20">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800"
              className="w-full h-full object-cover scale-110"
              alt="Chef"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-72 lg:w-96 z-30 animate-float">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
              className="rounded-[60px] border-[10px] border-white shadow-2xl"
              alt="Dish"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
