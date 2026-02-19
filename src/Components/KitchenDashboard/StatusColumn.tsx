import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OrderCard } from "./OrderCard";

interface StatusColumnProps {
  status: string;
  config: any;
  orders: any[];
  onUpdate: (id: string, status: string) => void;
}

export const StatusColumn = memo(
  ({ status, config, orders, onUpdate }: StatusColumnProps) => {
    return (
      <div className="flex flex-col h-full min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center">
        <div className="flex items-center justify-between px-5 mb-5 bg-white py-4 rounded-[1.8rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl bg-${config.color}-50 text-${config.color}-600`}
            >
              <config.icon size={18} />
            </div>
            <h3 className="font-black text-gray-800 text-[13px] uppercase tracking-wider">
              {config.label}
            </h3>
          </div>
          <span
            className={`bg-${config.color}-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-${config.color}-100`}
          >
            {orders.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-5 px-1 pb-10 hide-scrollbar">
          <AnimatePresence mode="popLayout">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  status={status}
                  onUpdate={onUpdate}
                  config={config}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-gray-50/50"
              >
                <span className="text-[10px] font-bold text-gray-400">
                  لا توجد طلبات
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);
