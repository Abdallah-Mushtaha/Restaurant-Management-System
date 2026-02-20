import { ArrowUpRight } from "lucide-react";

export const PremiumActionCard = ({ title, desc, icon, onClick, variant }: any) => {
  const styles = variant === "orange" ? "bg-orange-600 text-white shadow-orange-200" : "bg-gray-900 text-white shadow-gray-200";
  return (
    <button onClick={onClick} className={`${styles} p-6 rounded-[1.5rem] text-right flex flex-col justify-between h-36 transition-all hover:scale-[1.03] active:scale-95 shadow-xl relative overflow-hidden group`}>
      <div className="bg-white/20 w-fit p-3 rounded-xl backdrop-blur-md group-hover:rotate-[-10deg] group-hover:bg-white/30 transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-black flex items-center gap-2">
          {title} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </h4>
        <p className="text-white/60 text-xs font-bold">{desc}</p>
      </div>
    </button>
  );
};
