import { useState, useMemo } from "react";

export function useMenuFilters(menu: any[]) {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    return ["الكل", ...Array.from(new Set(menu.map((item) => item.category)))];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory =
        activeCategory === "الكل" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, activeCategory, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    categories,
    filteredMenu,
  };
}
