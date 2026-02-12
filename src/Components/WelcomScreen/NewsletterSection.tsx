import React from "react";
import { Send, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section
      className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto max-w-6xl relative">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-orange-400/20 blur-[80px] md:blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-orange-300/20 blur-[80px] md:blur-[100px] -z-10 animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[40px] md:rounded-[60px] p-8 md:p-20 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5">
          <div className="absolute inset-0 opacity-5 md:opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-1.5 md:px-5 md:py-2 rounded-full mb-6 md:mb-8">
              <Sparkles size={14} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">
                عرض حصري
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-[1000] text-white text-center mb-6 leading-tight">
              انضم لنادي <span className="text-orange-500 italic">التذوق</span>{" "}
              <br className="hidden sm:block" />
              واحصل على{" "}
              <span className="underline decoration-orange-500/30 underline-offset-4 md:underline-offset-8">
                خصم 20%
              </span>
            </h2>

            <p className="text-gray-400 text-base md:text-xl text-center mb-10 md:mb-12 max-w-2xl font-medium leading-relaxed">
              كن أول من يعرف عن أطباقنا الموسمية، فعالياتنا الخاصة، والعروض
              الحصرية لمشتركينا.
            </p>

            <div className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-[25px] md:rounded-[30px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative flex flex-col sm:flex-row gap-3 bg-[#1a1a1a] p-2 md:p-2.5 rounded-[25px] md:rounded-[30px] border border-white/10">
                <div className="flex-1 relative flex items-center">
                  <div className="absolute right-5 text-gray-500">
                    <Send size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="w-full bg-transparent pr-12 pl-4 py-4 md:py-5 text-white outline-none text-base md:text-lg placeholder:text-gray-600 font-bold"
                  />
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 md:py-5 rounded-[20px] md:rounded-[22px] font-black text-base md:text-lg transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap cursor-pointer">
                  اشترك الآن
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-gray-500 text-[10px] md:text-sm font-bold">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                آمن 100%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                إلغاء الاشتراك متاح دائماً
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
