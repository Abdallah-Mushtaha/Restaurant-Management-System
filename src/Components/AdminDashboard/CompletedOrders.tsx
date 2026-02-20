import { memo } from "react";
import { FileText } from "lucide-react";

export const CompletedOrders = memo(({ orders }: { orders: any[] }) => (
  <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-50">
    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
      <span className="w-2 h-8 bg-green-500 rounded-full"></span>
      الفواتير والطلبات المكتملة ({orders.length})
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-right" dir="rtl">
        <thead>
          <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
            <th className="pb-4">رقم الطلب</th>
            <th className="pb-4">الطاولة</th>
            <th className="pb-4">التاريخ</th>
            <th className="pb-4">الإجمالي</th>
            <th className="pb-4 text-center">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              <td className="py-5 font-black text-gray-900">
                #{order.orderNumber}
              </td>
              <td className="py-5 text-gray-600 font-bold">{order.table}</td>
              <td className="py-5 text-gray-400 font-medium">{order.date}</td>
              <td className="py-5 font-black text-gray-900">
                {order.total} جنيه مصري
              </td>
              <td className="py-5 text-center">
                <button className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-xl text-xs font-black hover:bg-black hover:text-white transition-all active:scale-95">
                  <FileText className="w-3.5 h-3.5" />
                  عرض الفاتورة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));
