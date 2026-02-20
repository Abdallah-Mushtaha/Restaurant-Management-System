import { useAccounts } from "../../hooks/AdminDashbord/useAccounts";
import { MonthlyStats } from "./MonthlyStats";
import { CompletedOrders } from "./CompletedOrders";
import DashboardLayout from "../../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AccountsPage() {
  const { monthlyStats, completedOrders, isLoading } = useAccounts();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <DashboardLayout
      title="إدارة الحسابات"
      subtitle="إدارة المطعم والمنتجات والإحصائيات"
      userName="مدير النظام"
      onLogout={handleLogout}
      navItems={[]}
    >
      <div className="h-full flex flex-col space-y-6">
        <div className="flex-1 overflow-y-auto space-y-6 pb-10 custom-scrollbar">
          <MonthlyStats stats={monthlyStats} />
          <CompletedOrders orders={completedOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
