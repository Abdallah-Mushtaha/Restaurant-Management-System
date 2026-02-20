import { useState, useCallback, memo } from "react";
import { Edit, Trash2, Clock, Plus, Link as LinkIcon } from "lucide-react";
import { useProducts } from "../../hooks/AdminDashbord/useProducts";
import { ProductModal } from "./ProductModal";

const ProductRow = memo(({ item, onEdit, onDelete }: any) => (
  <div className="group hover:bg-orange-50/20 transition-all p-4 md:p-5">
    <div className="hidden md:grid grid-cols-6 items-center text-right">
      <div className="col-span-2 flex items-center gap-4">
        <img
          src={item.image}
          className="w-14 h-14 rounded-2xl object-cover bg-gray-100"
          loading="lazy"
        />
        <div className="flex flex-col truncate">
          <span className="font-black text-gray-900">{item.name}</span>
          <span className="text-[10px] text-gray-400 font-bold truncate max-w-[150px]">
            {item.description}
          </span>
        </div>
      </div>
      <div>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
          {item.category}
        </span>
      </div>
      <div className="font-black text-gray-900">
        {item.price} <small className="text-orange-600">جنيه مصري</small>
      </div>
      <div className="flex items-center gap-1 text-gray-400 font-bold text-xs">
        <Clock className="w-3 h-3" /> {item.prepTime} دقيقة
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 hover:bg-black hover:text-white rounded-xl transition-all"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 hover:bg-red-600 hover:text-white rounded-xl text-red-500 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="md:hidden flex gap-4 items-center">
      <img
        src={item.image}
        className="w-20 h-20 rounded-2xl object-cover bg-gray-100"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-black text-orange-600 uppercase">
            {item.category}
          </span>
          <div className="flex gap-3">
            <Edit
              onClick={() => onEdit(item)}
              className="w-4 h-4 text-gray-400"
            />
            <Trash2
              onClick={() => onDelete(item.id)}
              className="w-4 h-4 text-red-400"
            />
          </div>
        </div>
        <h4 className="font-black text-gray-900 truncate mt-0.5">
          {item.name}
        </h4>
        <div className="flex justify-between items-center mt-2">
          <span className="font-black text-gray-900 text-sm">
            {item.price} جنيه مصري
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
            <Clock className="w-3 h-3" /> {item.prepTime} د
          </span>
        </div>
      </div>
    </div>
  </div>
));

export const ProductsTable = ({ products }: { products: any[] }) => {
  const { deleteProduct, addProduct, updateProduct, isMutating } =
    useProducts();
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    prepTime: "",
    image: "",
    description: "",
  });

  const toggleModal = useCallback(
    (mode: "add" | "edit" | null, product: any = null) => {
      if (product) {
        setSelectedId(product.id);
        setFormData({ ...product, price: product.price.toString() });
      } else {
        setFormData({
          name: "",
          category: "العروض",
          price: "",
          prepTime: "",
          image: "",
          description: "",
        });
      }
      setModalMode(mode);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const data = { ...formData, price: Number(formData.price) };
    modalMode === "add"
      ? addProduct(data)
      : updateProduct({ id: selectedId, data });
    setModalMode(null);
  }, [formData, modalMode, addProduct, updateProduct, selectedId]);

  return (
    <div
      className={`h-full flex flex-col space-y-4 ${isMutating ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex justify-between items-center px-2">
        <h1 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-2">
          <span className="bg-orange-50 p-2 rounded-lg text-orange-600">
            📦
          </span>{" "}
          إدارة المنتجات
        </h1>
        <button
          onClick={() => toggleModal("add")}
          className="bg-orange-600 text-white px-4 md:px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all hover:bg-orange-700 active:scale-95 text-sm"
        >
          <Plus className="w-5 h-5" />{" "}
          <span className="hidden md:inline">منتج جديد</span>
          <span className="md:hidden">إضافة</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden flex-1 flex flex-col border-none shadow-none">
        <div className="hidden md:grid grid-cols-6 bg-gray-50/50 p-5 text-[11px] font-black text-gray-400 uppercase text-right tracking-widest">
          <div className="col-span-2">المنتج</div>
          <div>الفئة</div>
          <div>السعر</div>
          <div>الوقت</div>
          <div className="text-center">الإجراءات</div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 custom-scrollbar">
          {products.map((item) => (
            <ProductRow
              key={item.id}
              item={item}
              onEdit={(p: any) => toggleModal("edit", p)}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      </div>

      <ProductModal
        isOpen={!!modalMode}
        onClose={() => setModalMode(null)}
        title={modalMode === "add" ? "إضافة منتج جديد" : "تعديل البيانات"}
        confirmText={modalMode === "add" ? "إضافة" : "حفظ"}
        onConfirm={handleSubmit}
      >
        <div className="md:col-span-2">
          <Field
            label="اسم المنتج"
            value={formData.name}
            onChange={(v: string) =>
              setFormData((prev) => ({ ...prev, name: v }))
            }
            placeholder="اسم الوجبة..."
          />
        </div>
        <Field
          label="الفئة"
          value={formData.category}
          onChange={(v: string) =>
            setFormData((prev) => ({ ...prev, category: v }))
          }
          placeholder="المقبلات، العروض..."
        />
        <Field
          label="السعر"
          value={formData.price}
          onChange={(v: string) =>
            setFormData((prev) => ({ ...prev, price: v }))
          }
          type="number"
          placeholder="0.00"
        />
        <Field
          label="الوقت"
          value={formData.prepTime}
          onChange={(v: string) =>
            setFormData((prev) => ({ ...prev, prepTime: v }))
          }
          placeholder="15"
        />
        <Field
          label="الرابط"
          value={formData.image}
          onChange={(v: string) =>
            setFormData((prev) => ({ ...prev, image: v }))
          }
          placeholder="https://..."
          icon={<LinkIcon className="w-4 h-4" />}
        />
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-[11px] font-black text-gray-400 uppercase mr-1">
            الوصف
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none min-h-[80px] resize-none"
          />
        </div>
      </ProductModal>
    </div>
  );
};

const Field = memo(
  ({ label, value, onChange, placeholder, type = "text", icon }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-black text-gray-400 uppercase mr-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all ${icon ? "pl-11" : ""}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  ),
);
