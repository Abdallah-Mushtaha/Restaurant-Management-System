import { CheckCircle2, UtensilsCrossed } from "lucide-react";
import React from "react";

interface Props {
  aboutRef: React.RefObject<HTMLElement>;
}

const AboutSection = ({ aboutRef }: Props) => {
  const features = [
    "مكونات طازجة",
    "أفضل المذاقات",
    "سرعة التقديم",
    "نظافة تامة",
    "نكهات مميزة",
  ];

  return (
    <section
      ref={aboutRef}
      className="py-16 md:py-40 bg-white overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12 order-1 lg:order-2 text-center lg:text-right">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-500 mb-2">
                <span className="w-8 h-[2px] bg-orange-500"></span>
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  قصة نجاحنا
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-[1000] text-gray-900 leading-[1.1]">
                شيف ذو خبرة <br />
                <span className="text-orange-500 italic">عالمية</span> فريدة
              </h2>

              <div className="block lg:hidden relative w-full max-w-[320px] aspect-square mx-auto my-10">
                <div className="absolute inset-0 bg-[#FFEDD5] rounded-full scale-95 shadow-inner"></div>
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-full">
                  <img
                    src="https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800"
                    className="w-[110%] h-[110%] object-cover object-top mt-4 transition-transform duration-500 hover:scale-105"
                    alt="Our Expert Chef"
                  />
                </div>
              </div>

              <p className="text-gray-400 text-base md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                نحن نجمع بين الشغف والمهارة لنقدم لك أطباقاً تتعدى كونها مجرد
                وجبة، بل هي تجربة غنية بالحواس والمذاقات الفاخرة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 max-w-lg mx-auto lg:mx-0">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group bg-gray-50 p-4 rounded-2xl border border-transparent hover:border-orange-100 transition-all"
                >
                  <div className="bg-white text-orange-500 p-2 rounded-lg shadow-sm">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-lg font-black text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-gray-900 text-white cursor-pointer px-10 py-5 rounded-full font-black text-lg shadow-xl active:scale-95 transition-all">
                اقرأ المزيد
              </button>
              <button className="bg-orange-500 cursor-pointer text-white cursor-pointer px-10 py-5 rounded-full font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                احجز طاولة
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative order-2 lg:order-1">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-[#FFEDD5] rounded-full scale-105 shadow-2xl opacity-70"></div>
              <div className="relative h-full w-full rounded-full overflow-hidden border-[15px] border-white shadow-2xl z-10">
                <img
                  src="https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-[110%] h-[110%] object-cover object-top mt-0"
                  alt="Our Expert Chef"
                />
              </div>
              <div className="absolute -top-10 -right-6 bg-white p-8 rounded-[40px] shadow-2xl flex items-center gap-4 z-20 border border-gray-50">
                <div className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg">
                  <UtensilsCrossed size={24} />
                </div>
                <div className="text-right">
                  <p className="font-[1000] text-xl text-gray-900 leading-tight">
                    خبرة 15 عاماً
                  </p>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">
                    في فن الطهي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
