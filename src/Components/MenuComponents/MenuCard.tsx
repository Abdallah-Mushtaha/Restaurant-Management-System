import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export const MenuCard = ({ item, guestId }: { item: any; guestId: string }) => {
  const addToCart = useCartStore((state: any) => state.addToCart);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-[2.5rem] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 relative"
    >
      <div className="relative h-56 rounded-[2rem] overflow-hidden mb-5">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {item.isPopular && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-[10px] font-black text-orange-600 uppercase">
              الأكثر طلباً 🔥
            </span>
          </div>
        )}
      </div>

      <div className="px-3 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-black text-gray-800 mb-1 group-hover:text-orange-600 transition-colors tracking-tight">
              {item.name}
            </h3>
            <p className="text-gray-400 text-[11px] font-medium leading-relaxed line-clamp-2 h-8">
              {item.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-300 uppercase">
              السعر
            </span>
            <span className="text-2xl font-black text-gray-900 italic">
              {item.price}
              <small className="text-xs mr-1 text-orange-600 font-bold">
                ج.م
              </small>
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(item, guestId)}
            className="w-14 h-14 bg-gray-50 group-hover:bg-orange-600 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
