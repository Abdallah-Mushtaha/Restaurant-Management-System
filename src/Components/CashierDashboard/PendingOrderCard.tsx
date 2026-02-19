import { Printer } from "lucide-react";

export const PendingOrderCard = ({ order, onPrint, onPayment }: any) => (
  <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border-2 border-gray-50 hover:border-blue-100 transition-all">
    <div className="flex justify-between items-center mb-6">
      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-2xl text-[12px] font-black italic">
        طاولة {order.tableNumber}
      </span>
      <span className="text-xs text-gray-400 font-mono">
        #{order.id.slice(-5)}
      </span>
    </div>

    <div className="space-y-3 mb-6">
      {order.items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-gray-600 font-bold">
            {item.name}{" "}
            <small className="text-blue-500">×{item.quantity}</small>
          </span>
          <span className="font-black text-gray-800">
            {item.price * item.quantity} ر.س
          </span>
        </div>
      ))}
    </div>

    <div className="border-t border-dashed pt-4 mb-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 font-bold">المطلوب دفعه:</span>
        <span className="text-2xl font-black text-blue-600">
          {order.totalAmount} ر.س
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-2">
      <button
        onClick={() => onPrint(order)}
        className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
      >
        <Printer size={16} /> طباعة الفاتورة
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onPayment(order, "cash")}
          className="py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-sm transition-transform active:scale-95"
        >
          💵 كاش
        </button>
        <button
          onClick={() => onPayment(order, "other")}
          className="py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black text-sm transition-transform active:scale-95"
        >
          💳 بطاقة
        </button>
      </div>
    </div>
  </div>
);
