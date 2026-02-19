import { DollarSign } from "lucide-react";

export const StatsView = ({ total }: { total: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-100 flex justify-between items-center">
      <div>
        <p className="text-gray-500 font-bold text-sm">إجمالي مبيعات اليوم</p>
        <h3 className="text-4xl font-black text-green-600 mt-2">
          {total} <span className="text-sm">ر.س</span>
        </h3>
      </div>
      <div className="bg-green-50 p-4 rounded-2xl text-green-600">
        <DollarSign size={40} />
      </div>
    </div>
  </div>
);
