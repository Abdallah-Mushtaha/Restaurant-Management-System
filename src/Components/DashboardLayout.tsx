import { useState, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  Settings,
  User as UserIcon,
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Users,
  ClipboardList,
  Bell,
  Flame,
  Timer,
  CheckCircle,
  BarChart3,
  ChefHat,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onLogout: () => void;
}

const NavItem = memo(({ label, icon, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-4 rounded-[1.5rem] transition-all duration-300 group ${
      active
        ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
        : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
    }`}
  >
    <div className="flex items-center gap-4">
      <span
        className={`text-xl ${!active && "group-hover:scale-110"} transition-transform`}
      >
        {icon}
      </span>
      <span className="font-bold text-sm">{label}</span>
    </div>
    {label.includes("(") && (
      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black">
        !
      </span>
    )}
  </button>
));

export default function DashboardLayout({
  children,
  title,
  subtitle,
  onLogout,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = useMemo(
    () => JSON.parse(localStorage.getItem("user") || "{}"),
    [],
  );

  const menuConfig = useMemo(() => {
    const configs: any = {
      admin: {
        roleName: "مسؤول النظام",
        items: [
          {
            label: "نظرة عامة",
            icon: <LayoutDashboard size={20} />,
            path: "/admin",
          },
          {
            label: "المنتجات",
            icon: <UtensilsCrossed size={20} />,
            path: "/admin/products",
          },
          {
            label: "الفئات",
            icon: <Layers size={20} />,
            path: "/admin/categories",
          },
          {
            label: "الحسابات",
            icon: <Users size={20} />,
            path: "/admin/accounts",
          },
        ],
      },
      kitchen: {
        roleName: "المطبخ",
        items: [
          {
            label: "جميع الطلبات",
            icon: <ClipboardList size={20} />,
            path: "/kitchen",
          },
          {
            label: "الجديدة ",
            icon: <Bell size={20} />,
            path: "/kitchen/new",
          },
          {
            label: "قيد التحضير ",
            icon: <Flame size={20} />,
            path: "/kitchen/preparing",
          },
          {
            label: "المنجزة ",
            icon: <CheckCircle size={20} />,
            path: "/kitchen/completed",
          },
        ],
      },
      cashier: {
        roleName: "أمين الصندوق",
        items: [
          {
            label: "الطلبات المعلقة",
            icon: <Timer size={20} />,
            path: "/order",
          },
          {
            label: "المبيعات المنجزة",
            icon: <CheckCircle size={20} />,
            path: "/sales",
          },
          {
            label: "الإحصائيات",
            icon: <BarChart3 size={20} />,
            path: "/stats",
          },
        ],
      },
    };
    return configs[user.role] || configs.admin;
  }, [user.role]);

  const handleLogout = () => {
    toast.success("تم تسجيل الخروج");
    onLogout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-gray-200/50 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-gray-300">
            <ChefHat size={20} className="text-orange-500" />
          </div>
          <div>
            <h2 className="font-black text-xl text-gray-900 leading-none">
              مطعمنا
            </h2>
            <span className="text-[10px] text-orange-600 font-bold tracking-widest uppercase">
              بريميم
            </span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuConfig.items.map((item: any, index: number) => (
            <NavItem
              key={index}
              {...item}
              active={window.location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileOpen(false);
              }}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-gray-50 rounded-[2rem] p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center shrink-0">
              <UserIcon size={18} className="text-orange-600" />
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-[13px] text-gray-900 truncate leading-none mb-1">
                {menuConfig.roleName}
              </p>
              <p className="text-[10px] text-gray-400 truncate font-medium">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-600 font-black py-4 rounded-[1.5rem] hover:bg-rose-600 hover:text-white transition-all duration-300 group"
        >
          <LogOut
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm">تسجيل الخروج</span>
        </button>
      </div>
    </>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F9FD] flex overflow-hidden">
      <aside className="hidden lg:flex w-[300px] bg-white border-l border-gray-100 flex-col sticky top-0 h-screen z-50">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-3 bg-gray-50 rounded-2xl text-gray-900"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </section>
      </main>
    </div>
  );
}
