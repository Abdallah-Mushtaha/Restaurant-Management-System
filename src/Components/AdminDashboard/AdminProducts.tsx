import DashboardLayout from "../../Components/DashboardLayout";
import { ProductsTable } from "./ProductsTable";
import { TableSkeleton } from "./TableSkeleton";
import { useProducts } from "../../hooks/AdminDashbord/useProducts";

export default function AdminProducts({ onLogout }: any) {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="h-screen overflow-hidden bg-gray-50/50">
      <DashboardLayout
        title="إدارة المنيو"
        subtitle="تحديث قائمة الطعام"
        userName="المدير"
        onLogout={onLogout}
        navItems={[]}
      >
        <div className="h-full p-4 md:p-8">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <ProductsTable products={products} />
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
