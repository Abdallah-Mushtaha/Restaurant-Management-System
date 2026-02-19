import { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Settings,
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Users,
  ClipboardList,
  Bell,
  Flame,
  CheckCircle,
  Timer,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./DashboardLayout/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onLogout?: () => void;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  onLogout,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
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
          { label: "الجديدة ", icon: <Bell size={20} />, path: "/kitchen/new" },
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
            path: "/cashier",
          },
          {
            label: "المبيعات المنجزة",
            icon: <CheckCircle size={20} />,
            path: "/cashier/sales",
          },
          {
            label: "الإحصائيات",
            icon: <BarChart3 size={20} />,
            path: "/cashier/stats",
          },
        ],
      },
    };
    return configs[user.role] || configs.admin;
  }, [user.role]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    onLogout?.();

    toast.success("تم تسجيل الخروج");

    navigate("/login", { replace: true });
  }, [onLogout, navigate]);

  const handleNavigate = useCallback(
    (path: string) => {
      if (location.pathname !== path) {
        navigate(path);
      }
      setIsMobileOpen(false);
    },
    [navigate, location.pathname],
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F9FD] flex overflow-hidden">
      <aside className="hidden lg:flex w-[300px] bg-white border-l border-gray-100 flex-col sticky top-0 h-screen z-50">
        <Sidebar
          menuConfig={menuConfig}
          user={user}
          activePath={location.pathname}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
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
              <Sidebar
                menuConfig={menuConfig}
                user={user}
                activePath={location.pathname}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
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
