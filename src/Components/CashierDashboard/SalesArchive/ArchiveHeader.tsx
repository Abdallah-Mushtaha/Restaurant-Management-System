import { Calendar, Search } from "lucide-react";

export const ArchiveHeader = ({ count, onSearchChange }: { count: number, onSearchChange: (val: string) => void }) => (
    <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
        <h3 className="font-black text-gray-800 flex items-center gap-2 text-lg">
            <Calendar size={20} className="text-blue-600" />
            المبيعات المنجزة ({count})
        </h3>
        <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
                type="text"
                placeholder="بحث برقم الطاولة..."
                className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    </div>
);