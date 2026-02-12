import React from "react";
import { Star, Flame, TrendingUp, ArrowUpLeft } from "lucide-react";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  img: string;
  rating: number;
  orders: string;
  badge: string;
}

const MenuSection = () => {
  const bestSellers: Dish[] = [
    {
      id: 1,
      name: "إفطار فرنسي متكامل",
      description: "كرواسون طازج، بيض مخفوق، زبدة مملحة، ومربى توت عضوي.",
      price: "54",
      img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5.0,
      orders: "2.4k+ طلب",
      badge: "الأكثر مبيعاً",
    },
    {
      id: 2,
      name: "بيتزا مارغريتا إيطالية",
      description: "عجينة مخمرة 48 ساعة، صوص طماطم نابولي، وجبن موزاريلا طازج.",
      price: "68",
      img: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.9,
      orders: "1.8k+ طلب",
      badge: "اختيار الشيف",
    },
    {
      id: 3,
      name: "تاكو الدجاج المقرمش",
      description:
        "خبز التورتيلا اليدوي، دجاج متبل، صوص سريراتشا، وسلطة كول سلو.",
      price: "42",
      img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.8,
      orders: "3.2k+ طلب",
      badge: "ترند الأسبوع",
    },
  ];

  return (
    <section
      id="menu"
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100/50">
            <TrendingUp size={14} className="text-orange-500" />
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              الأكثر طلباً هذا الشهر
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-[900] text-gray-900 tracking-tight">
            قائمة <span className="text-orange-500 italic">التميز</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            مجموعة مختارة من الأطباق التي يفضلها عملاؤنا، محضرة بعناية لتناسب
            ذوقك الرفيع.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bestSellers.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-[45px] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.1)] transition-all duration-700 border border-transparent hover:border-orange-100/50"
            >
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-orange-100 rounded-full scale-110 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-white shadow-lg text-gray-900 px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1">
                  <Flame size={12} className="text-orange-500" />
                  {dish.badge}
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="flex justify-center items-center gap-1 text-orange-500 font-bold bg-orange-50 w-fit mx-auto px-3 py-1 rounded-full text-xs">
                  <Star size={12} fill="currentColor" />
                  <span>{dish.rating}</span>
                </div>

                <h3 className="text-2xl font-black text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
                  {dish.name}
                </h3>

                <p className="text-sm text-gray-400 font-medium leading-relaxed min-h-[40px]">
                  {dish.description}
                </p>

                <div className="pt-6 flex items-center justify-between border-t border-gray-50">
                  <div className="text-right">
                    <span className="block text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                      السعر
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-[1000] text-gray-900">
                        {dish.price}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        EGP
                      </span>
                    </div>
                  </div>

                  <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-[-45deg] transition-all duration-500 shadow-sm cursor-pointer">
                    <ArrowUpLeft size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
