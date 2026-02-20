import React from "react";
import { Eye, Printer } from "lucide-react";

export const SalesTable = React.memo(({ sales, onSelect, onPrint }: any) => (
  <div className="overflow-x-auto">
    <table className="w-full text-right hidden md:table">
      <thead>
        <tr className="bg-white text-gray-400 text-[13px] uppercase border-b border-gray-100">
          <th className="p-5 font-bold">الطاولة</th>
          <th className="p-5 font-bold">الوقت</th>
          <th className="p-5 font-bold">التاريخ</th>
          <th className="p-5 font-bold">العناصر</th>
          <th className="p-5 font-bold">الإجمالي</th>
          <th className="p-5 font-bold">الدفع</th>
          <th className="p-5 text-center font-bold">الفاتورة</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {sales.map((sale: any) => (
          <tr key={sale.id} className="hover:bg-blue-50/30 transition-colors">
            <td className="p-5 font-black text-gray-700">
              #{sale.tableNumber}
            </td>
            <td className="p-5 text-gray-600">{sale.time}</td>
            <td className="p-5 text-gray-500 text-sm">{sale.date}</td>
            <td className="p-5 font-bold">{sale.itemsCount}</td>
            <td className="p-5 text-blue-700 font-black">
              {sale.total.toFixed(2)} جنيه مصري
            </td>
            <td className="p-5 text-sm">{sale.method}</td>
            <td className="p-5">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onSelect(sale)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Eye size={14} /> عرض
                </button>
                <button
                  onClick={() => onPrint(sale)}
                  className="p-1.5 text-gray-400 hover:text-blue-600"
                >
                  <Printer size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Mobile View Card */}
    <div className="md:hidden divide-y divide-gray-100">
      {sales.map((sale: any) => (
        <div key={sale.id} className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-black text-lg text-gray-800">
              طاولة #{sale.tableNumber}
            </span>
            <span className="text-blue-700 font-black">
              {sale.total.toFixed(2)} جنيه مصري
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>
              {sale.date} | {sale.time}
            </span>
            <span>{sale.itemsCount} أصناف</span>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onSelect(sale)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm"
            >
              <Eye size={16} /> عرض التفاصيل
            </button>
            <button
              onClick={() => onPrint(sale)}
              className="px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
));
