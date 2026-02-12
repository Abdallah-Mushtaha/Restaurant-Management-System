import {
  ShoppingBag,
  Facebook,
  Instagram,
  Twitter,
  Phone,
  MapPin,
  Mail,
  ChevronLeft,
  Clock,
} from "lucide-react";
import React from "react";

interface Props {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  homeRef: React.RefObject<HTMLElement>;
  dishesRef: React.RefObject<HTMLElement>;
  aboutRef: React.RefObject<HTMLElement>;
}

const Footer = ({ scrollToSection, homeRef, dishesRef, aboutRef }: Props) => {
  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
  ];

  const quickLinks = [
    { name: "الرئيسية", ref: homeRef },
    { name: "الأكثر طلباً", ref: dishesRef },
    { name: "قصة نجاحنا", ref: aboutRef },
    { name: "العروض الخاصة", ref: dishesRef },
  ];

  const contactInfo = [
    { Icon: MapPin, text: "شارع التحرير، الدقي، مصر" },
    { Icon: Phone, text: "+20 123 456 7890", dir: "ltr" },
    { Icon: Mail, text: "info@restaurant.com" },
  ];

  return (
    <footer
      className="relative bg-[#101828] pt-20 pb-10 overflow-hidden text-right"
      dir="rtl"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-2.5 rounded-xl text-white shadow-lg shadow-orange-900/20">
                <ShoppingBag size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                مطعمنا
              </span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              نجمع بين فن الطهي التقليدي واللمسات العصرية لنقدم تجربة تذوق لا
              تُنسى.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all duration-300 border border-white/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-8 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-600 rounded-full"></span>
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li
                  key={idx}
                  onClick={() => scrollToSection(link.ref)}
                  className="group text-gray-400 hover:text-orange-500 cursor-pointer transition-all flex items-center gap-2 font-bold"
                >
                  <ChevronLeft
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-8 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-600 rounded-full"></span>
              تواصل معنا
            </h4>
            <ul className="space-y-5">
              {contactInfo.map(({ Icon, text, dir }, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-gray-400 font-bold items-start group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange-600/10 transition-colors">
                    <Icon size={18} className="text-orange-600" />
                  </div>
                  <span className="pt-1.5" dir={dir}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
            <h4 className="text-white font-black mb-6 flex items-center gap-2 text-lg">
              <Clock size={20} className="text-orange-600" />
              أوقات العمل
            </h4>
            <div className="space-y-4 font-bold">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-gray-500 text-sm">الأحد - الخميس</span>
                <span className="text-gray-200 text-xs">10:00 م - 12:00 ص</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500 text-sm">الجمعة - السبت</span>
                <span className="text-orange-500 text-xs">
                  01:00 م - 02:00 ص
                </span>
              </div>
            </div>
            <button className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-900/20 cursor-pointer">
              اطلب الآن
            </button>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-bold">
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمطعمنا
          </p>
          <div className="flex gap-6 text-xs font-bold text-gray-600">
            <span className="hover:text-orange-600 cursor-pointer">
              سياسة الخصوصية
            </span>
            <span className="hover:text-orange-600 cursor-pointer">
              الشروط والأحكام
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
