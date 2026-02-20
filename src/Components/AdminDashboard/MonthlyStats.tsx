import { memo } from "react";

export const MonthlyStats = memo(({ stats }: { stats: any[] }) => (
  <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-50">
    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
      <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
      الإحصائيات الشهرية
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-right" dir="rtl">
        <thead>
          <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
            <th className="pb-4">الشهر</th>
            <th className="pb-4">الإيرادات</th>
            <th className="pb-4">عدد الطلبات</th>
            <th className="pb-4">متوسط الطلب</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {stats.map((row, i) => (
            <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
              <td className="py-5 font-bold text-gray-900">{row.month}</td>
              <td className="py-5 font-black text-orange-600">
                {row.revenue.toLocaleString()} جنيه مصري
              </td>
              <td className="py-5 font-bold text-gray-600">
                {row.ordersCount} طلب
              </td>
              <td className="py-5 font-bold text-gray-400">{row.average} ج</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));
