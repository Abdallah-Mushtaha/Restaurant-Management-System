import { memo } from "react";
import { X } from "lucide-react";

export const ProductModal = memo(
  ({ isOpen, onClose, title, children, onConfirm, confirmText }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 shadow-2xl">
          <div className="p-6 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl md:text-2xl font-black text-gray-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto max-h-[60vh] px-1 custom-scrollbar">
              {children}
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={onConfirm}
                className="flex-[2] bg-orange-600 text-white font-black py-4 rounded-2xl transition-all active:scale-95"
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-600 font-black py-4 rounded-2xl transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
