import { Sparkles } from "lucide-react";

export const BentoOffers = ({ offers, onScrollToMenu }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
    <div className="md:col-span-2 bg-gray-100 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 relative overflow-hidden h-[350px] md:h-[320px] group flex flex-col justify-end md:justify-center shadow-xl shadow-black/30">
      <div className="relative z-20 max-w-full md:max-w-[65%]">
        <span className="bg-white/90 text-orange-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          عرض اليوم المميز
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 mt-3 md:mt-5 mb-2 md:mb-3 leading-tight">
          {offers[0]?.name}
        </h2>
        <p className="text-gray-800/70 text-sm md:text-base font-bold mb-6 md:mb-8 line-clamp-2">
          {offers[0]?.description}
        </p>
        <button
          onClick={onScrollToMenu}
          className="bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs active:scale-95 shadow-lg shadow-orange-200 cursor-pointer"
        >
          تصفح القائمة الآن
        </button>
      </div>
      <img
        src={offers[0]?.image}
        className="absolute -left-4 -top-4 w-40 h-40 md:left-[-10%] md:top-1/2 md:-translate-y-1/2 md:w-[55%] md:h-[130%] object-cover rounded-full z-10"
        alt="offer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent md:hidden z-15" />
    </div>

    <div className="flex flex-col gap-5">
      <div className="flex-1 bg-orange-100 rounded-[2.5rem] p-6 relative overflow-hidden group shadow-lg shadow-orange-50 min-h-[140px]">
        <h3 className="font-black text-orange-900 text-lg relative z-20">
          {offers[1]?.name} <br />
          <span className="text-orange-600 text-xl">
            {offers[1]?.price} ج.م
          </span>
        </h3>
        <img
          src={offers[1]?.image}
          className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full border-4 border-white/50 z-10"
          alt="sub-offer"
        />
      </div>

      <div className="flex-1 bg-blue-50 rounded-[2.5rem] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg min-h-[140px]">
        <Sparkles className="text-blue-400 mb-2 w-8 h-8" />
        <h3 className="font-black text-blue-900 text-base leading-tight">
          جاهزون لخدمتك بأفضل جودة
        </h3>
      </div>
    </div>
  </div>
);
