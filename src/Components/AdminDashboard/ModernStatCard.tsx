export const ModernStatCard = ({
  title,
  value,
  suffix,
  icon,
  trend,
  color,
}: any) => (
  <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all cursor-default">
    <div className={`absolute top-0 right-0 w-1.5 h-full ${color}`} />
    <div className="flex justify-between items-start mb-2">
      <div
        className={`p-3 rounded-xl text-white ${color} shadow-sm group-hover:rotate-[15deg] group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        {trend}
      </span>
    </div>
    <p className="text-gray-400 font-black text-[10px] uppercase mb-1">
      {title}
    </p>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-black text-gray-900">{value}</span>
      <span className="text-[10px] font-bold text-gray-400">{suffix}</span>
    </div>
  </div>
);
