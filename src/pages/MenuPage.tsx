import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMenu } from "../hooks/MenuPage/useMenu";
import { useCartStore } from "../store/useCartStore";
import { MenuNavbar } from "../Components/MenuComponents/Navbar";
import { BentoOffers } from "../Components/MenuComponents/BentoOffers";
import { MenuFilters } from "../Components/MenuComponents/MenuFilters";
import { FloatingCart } from "../Components/MenuComponents/MenuComponents";
import { MenuCard } from "../Components/MenuComponents/MenuCard";
import { MenuSkeleton } from "../Components/MenuComponents/MenuSkeleton";

export default function MenuPage() {
  const navigate = useNavigate();
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const { data: menu = [], isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const guestInfo = useMemo(
    () => JSON.parse(localStorage.getItem("guest") || "{}"),
    [],
  );
  const guestId = guestInfo?.id;

  const totalItems = useCartStore((state: any) => state.getTotalItems(guestId));
  const totalPrice = useCartStore((state: any) => state.getTotalPrice(guestId));

  const bentoOffers = useMemo(
    () => menu.filter((item: any) => item.category === "العروض").slice(0, 3),
    [menu],
  );
  const categories = useMemo(
    () => [
      "الكل",
      ...Array.from(new Set(menu.map((item: any) => item.category))),
    ],
    [menu],
  );

  const filteredMenu = useMemo(() => {
    return menu.filter((item: any) => {
      const matchesCategory =
        activeCategory === "الكل" || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, activeCategory, searchQuery]);

  if (isLoading) return <MenuSkeleton />;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FDFDFD] pb-44 font-sans text-right"
    >
      <MenuNavbar
        guestInfo={guestInfo}
        totalItems={totalItems}
        onCartClick={() => navigate("/cart")}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <BentoOffers
          offers={bentoOffers}
          onScrollToMenu={() =>
            menuSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <div ref={menuSectionRef}>
          <MenuFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        <section className="min-h-screen">
          <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3 text-gray-800">
            <div className="w-2 h-6 bg-orange-600 rounded-full" />
            {activeCategory}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item: any) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id}
                >
                  <MenuCard item={item} guestId={guestId} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <AnimatePresence>
        {totalItems > 0 && (
          <FloatingCart
            totalItems={totalItems}
            totalPrice={totalPrice}
            onClick={() => navigate("/cart")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
