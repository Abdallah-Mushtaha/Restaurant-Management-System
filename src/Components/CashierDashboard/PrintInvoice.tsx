export const PrintInvoice = ({ order }: any) => {
  if (!order) return null;
  return (
    <div className="hidden print:block p-10 font-sans" dir="rtl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black">فاتورة ضريبية</h1>
        <p className="text-sm">طاولة رقم: {order.tableNumber}</p>
      </div>
      <table className="w-full text-right mb-8">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="py-2">الصنف</th>
            <th>الكمية</th>
            <th>السعر</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: any, idx: number) => (
            <tr key={idx} className="border-b border-gray-200">
              <td className="py-2">{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity} ر.س</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-left font-black text-xl">
        الإجمالي: {order.totalAmount} ر.س
      </div>
    </div>
  );
};
