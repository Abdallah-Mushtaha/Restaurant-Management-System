import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "أما أمبونسا",
    role: "المدير التنفيذي لشركة Inc",
    text: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد استمتعت حقاً بتجربة الطعام هنا كانت رائعة ومميزة جداً.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
  },
  {
    id: 2,
    name: "كويكو أدي",
    role: "مصمم جرافيك",
    text: "أفضل مطعم قمت بزيارته في الفترة الأخيرة، الخدمة سريعة والأطباق تقدم بشكل فني يفتح الشهية.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-orange-600 mb-4">
              <span className="w-10 h-[2px] bg-orange-600"></span>
              <span className="text-sm font-black uppercase tracking-widest">
                آراء العملاء
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-[1000] text-gray-900 leading-tight">
              قصص نجاحنا ترويها <br />
              <span className="text-orange-500 italic">أذواقكم</span> الرفيعة
            </h2>
          </div>
          <p className="text-gray-400 text-lg font-medium max-w-sm">
            نحن لا نقدم الطعام فحسب، بل نصنع ذكريات تدوم طويلاً مع كل وجبة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-orange-400 fill-orange-400"
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-4 -right-2 text-gray-50 w-16 h-16 -z-0" />
                  <p className="relative z-10 text-gray-700 text-xl md:text-2xl font-medium leading-[1.8] mb-10">
                    {t.text}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={t.img}
                    className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={t.name}
                  />
                  <div className="absolute -bottom-2 -left-2 bg-orange-500 w-6 h-6 rounded-lg flex items-center justify-center">
                    <Quote size={10} className="text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">{t.name}</h4>
                  <p className="text-gray-400 text-sm font-bold tracking-wide uppercase">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
