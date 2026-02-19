import { memo } from "react";

const NavItem = memo(({ label, icon, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-4 rounded-[1.5rem] transition-all duration-300 group ${
      active
        ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
        : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
    }`}
  >
    <div className="flex items-center gap-4">
      <span
        className={`text-xl ${!active && "group-hover:scale-110"} transition-transform`}
      >
        {icon}
      </span>
      <span className="font-bold text-sm">{label}</span>
    </div>
    {label.includes("(") && (
      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black">
        !
      </span>
    )}
  </button>
));

export default NavItem;
