import React from "react";

interface Props {
  dishesRef: React.RefObject<HTMLElement>;
}

const dishes = [
  {
    id: 1,
    name: "باستا إيطالي",
    price: "120 ج",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600",
  },
  {
    id: 2,
    name: "برجر لحم",
    price: "95 ج",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
  },
  {
    id: 3,
    name: "سلطة صحية",
    price: "75 ج",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
  },
];

const DishesSection = ({ dishesRef }: Props) => {
  return (
    <section ref={dishesRef} className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl lg:text-6xl font-[900] mb-6">
          أطباقنا المميزة
        </h2>
        <p className="text-gray-500 text-xl mb-20 max-w-2xl mx-auto">
          اختر من بين مجموعة متنوعة من الأطباق التي تم إعدادها بعناية لتمنحك
          تجربة لا تُنسى.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-[50px] p-8 shadow-xl card-hover text-right"
            >
              <div className="rounded-[40px] overflow-hidden mb-8">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-3xl font-black mb-4">{dish.name}</h3>
              <p className="text-orange-500 text-2xl font-bold mb-6">
                {dish.price}
              </p>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-[20px] font-bold hover:bg-orange-500 transition-all cursor-pointer">
                اطلب الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DishesSection;
