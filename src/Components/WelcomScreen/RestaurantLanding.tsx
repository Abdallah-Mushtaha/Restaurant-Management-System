import React, { useRef } from "react";
import GlobalStyles from "../../layout/GlobalStyles";
import FoodDoodles from "./FoodDoodles";
import Navbar from "../../layout/Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "../../layout/Footer";
import MenuSection from "./DishCard";

const RestaurantLanding = () => {
  const homeRef = useRef<HTMLElement>(null);
  const dishesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const offset = 100;
      const top =
        ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-gray-900 relative" dir="rtl">
      <GlobalStyles />
      <FoodDoodles />

      <Navbar
        scrollToSection={scrollToSection}
        homeRef={homeRef}
        dishesRef={dishesRef}
        aboutRef={aboutRef}
      />

      <div ref={homeRef as any}>
        <HeroSection
          homeRef={homeRef}
          dishesRef={dishesRef}
          scrollToSection={() => scrollToSection}
        />
      </div>

      <div ref={dishesRef as any}>
        <MenuSection />
      </div>

      <AboutSection aboutRef={aboutRef} />

      <TestimonialsSection />
      <NewsletterSection />

      <Footer
        scrollToSection={scrollToSection}
        homeRef={homeRef}
        dishesRef={dishesRef}
        aboutRef={aboutRef}
      />
    </div>
  );
};

export default RestaurantLanding;
