import { X, Printer } from "lucide-react";

export const SaleDetailsModal = ({
  sale,
  onClose,
}: {
  sale: any;
  onClose: () => void;
}) => {
  if (!sale) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-black text-xl">تفاصيل الفاتورة</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between mb-6 bg-gray-50 p-4 rounded-2xl">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">
                رقم الطاولة
              </p>
              <p className="text-lg font-black">{sale.tableNumber}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 font-bold uppercase">
                تاريخ العملية
              </p>
              <p className="text-sm font-bold">{sale.date}</p>
            </div>
          </div>
          <div className="space-y-3">
            {sale.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">
                    {item.quantity}x
                  </span>
                  <span className="font-bold text-gray-700">{item.name}</span>
                </div>
                <span className="font-black text-gray-900">
                  {item.price * item.quantity} ر.س
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 bg-gray-50 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-black text-gray-500">الإجمالي الكلي</span>
            <span className="text-2xl font-black text-blue-600">
              {sale.total.toFixed(2)} ر.س
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2"
          >
            <Printer size={20} /> طباعة نسخة العميل
          </button>
        </div>
      </div>
    </div>
  );
};
