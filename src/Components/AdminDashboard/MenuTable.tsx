import { Edit, Plus } from "lucide-react";

export const MenuTable = ({ data }: { data: any[] }) => (
  <div className="h-full flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
    <div className="p-6 border-b border-gray-50 flex justify-between items-center flex-shrink-0">
      <h2 className="text-2xl font-black text-gray-900">إدارة القائمة</h2>
      <button className="bg-gray-900 hover:bg-orange-600 text-white font-black py-3 px-8 rounded-xl transition-all flex items-center gap-2 group">
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />{" "}
        إضافة منتج
      </button>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <table className="w-full text-right border-collapse">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr>
            <th className="p-5 font-black text-gray-500 text-xs uppercase">
              المنتج
            </th>
            <th className="p-5 font-black text-gray-500 text-xs uppercase">
              التصنيف
            </th>
            <th className="p-5 font-black text-gray-500 text-xs uppercase">
              السعر
            </th>
            <th className="p-5 font-black text-gray-500 text-xs uppercase text-center">
              التحكم
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-orange-50/30 transition-all group"
            >
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-110 transition-transform duration-500"
                    alt=""
                  />
                  <span className="font-black text-gray-800">{item.name}</span>
                </div>
              </td>
              <td className="p-5 text-gray-500 font-bold">{item.category}</td>
              <td className="p-5 font-black text-gray-900 text-lg">
                {item.price} <small className="text-orange-600">ر.س</small>
              </td>
              <td className="p-5 text-center">
                <div className="flex justify-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-black hover:text-white transition-all group/btn">
                    <Edit className="w-4 h-4 group-hover/btn:rotate-12" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all group/btn">
                    <Trash2 className="w-4 h-4 group-hover/btn:scale-125" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
