export const CompletedOrderCard = ({ order }: any) => (
  <div className="bg-gray-50 rounded-[2.5rem] p-6 border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-500 font-bold">طاولة {order.tableNumber}</span>
      <span className="text-green-600 font-black text-xs">تم الدفع</span>
    </div>
    <div className="text-xl font-black text-gray-800">
      {order.totalAmount} جنيه مصري
    </div>
    <div className="text-xs text-gray-400 mt-2">
      {new Date(order.createdAt).toLocaleString("ar-EG")}
    </div>
  </div>
);
