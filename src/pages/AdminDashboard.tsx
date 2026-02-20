import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Components/DashboardLayout";
import {
  BarChart3,
  Package,
  Tags,
  LayoutGrid,
  Plus,
  FileText,
} from "lucide-react";
import { MenuTable } from "../Components/AdminDashboard/MenuTable";
import { ModernStatCard } from "../Components/AdminDashboard/ModernStatCard";
import { PremiumActionCard } from "../Components/AdminDashboard/PremiumActionCard";
import { useAdminData } from "../hooks/AdminDashbord/useAdminData";
import { DashboardSkeleton } from "../Components/AdminDashboard/DashboardSkeleton";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "categories" | "accounting"
  >("overview");
  const { menu, stats, isLoading } = useAdminData();

  const navItems = [
    { label: "الرئيسية", icon: "💎", id: "overview" },
    { label: "المنيو", icon: "🍕", id: "products" },
    { label: "الأصناف", icon: "🗂️", id: "categories" },
    { label: "المالية", icon: "💰", id: "accounting" },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <DashboardLayout
        title="الإدارة المركزية"
        subtitle="نظام التحكم الذكي"
        userName="المدير التنفيذي"
        userEmail="admin@system.io"
        onLogout={onLogout}
        navItems={navItems.map((item) => ({
          ...item,
          onClick: () => setActiveTab(item.id as any),
        }))}
      >
        <div className="h-full flex flex-col">
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
                    <ModernStatCard
                      title="إجمالي الدخل"
                      value={stats.totalRevenue}
                      suffix="جنيه مصري"
                      icon={<BarChart3 />}
                      trend="+12.5%"
                      color="bg-gradient-to-br from-orange-500 to-amber-600"
                    />
                    <ModernStatCard
                      title="الطلبات"
                      value={stats.totalOrders}
                      suffix="طلب"
                      icon={<Package />}
                      trend="+5.2%"
                      color="bg-gradient-to-br from-rose-500 to-red-600"
                    />
                    <ModernStatCard
                      title="المنتجات"
                      value={stats.productsCount}
                      suffix="صنف"
                      icon={<Tags />}
                      trend="مستقر"
                      color="bg-gradient-to-br from-emerald-500 to-teal-600"
                    />
                    <ModernStatCard
                      title="الزوار"
                      value={stats.visitorsCount}
                      suffix="زائر"
                      icon={<LayoutGrid />}
                      trend="محدث"
                      color="bg-gradient-to-br from-blue-500 to-indigo-600"
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                    <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 relative overflow-hidden flex flex-col justify-center group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50 rounded-full -mr-10 -mt-10 blur-3xl opacity-50 group-hover:bg-orange-100 transition-colors duration-700" />
                      <h2 className="text-2xl font-black mb-6 text-gray-900 relative">
                        الوصول السريع
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                        <PremiumActionCard
                          title="إضافة منتج"
                          desc="توسيع القائمة"
                          icon={<Plus className="w-6 h-6" />}
                          onClick={() => navigate("/admin/products")}
                          variant="orange"
                        />
                        <PremiumActionCard
                          title="الفواتير"
                          desc="التقارير المالية"
                          icon={<FileText className="w-6 h-6" />}
                          onClick={() => navigate("/admin/accounts")}
                          variant="dark"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-600/20 to-transparent" />
                      <h3 className="text-xl font-black mb-6">ملخص الحالة</h3>
                      <div className="space-y-4 relative">
                        <StatusItem
                          label="أداء النظام"
                          value="99.9%"
                          color="text-green-400"
                          pulse
                        />
                        <StatusItem
                          label="زوار اليوم"
                          value={stats.visitorsCount}
                          color="text-orange-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "products" && <MenuTable data={menu} />}
            </>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}

const StatusItem = ({ label, value, color, pulse }: any) => (
  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md flex justify-between items-center border border-white/5 group hover:bg-white/20 transition-all">
    <span className="font-bold text-gray-300">{label}</span>
    <span className={`${color} font-black ${pulse ? "animate-pulse" : ""}`}>
      {value}
    </span>
  </div>
);
