import { memo } from "react";
import { ChefHat, User as UserIcon, LogOut } from "lucide-react";
import NavItem from "./NavItem";

const Sidebar = memo(
  ({ menuConfig, user, activePath, onNavigate, onLogout }: any) => {
    return (
      <div className="flex flex-col h-full">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gray-200/50 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-gray-300">
              <ChefHat size={20} className="text-orange-500" />
            </div>
            <div>
              <h2 className="font-black text-xl text-gray-900 leading-none">
                مطعمنا
              </h2>
              <span className="text-[10px] text-orange-600 font-bold tracking-widest uppercase">
                بريميم
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {menuConfig.items.map((item: any, index: number) => (
              <NavItem
                key={index}
                {...item}
                active={activePath === item.path}
                onClick={() => onNavigate(item.path)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="bg-gray-50 rounded-[2rem] p-5 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center shrink-0">
                <UserIcon size={18} className="text-orange-600" />
              </div>
              <div className="overflow-hidden">
                <p className="font-black text-[13px] text-gray-900 truncate leading-none mb-1">
                  {menuConfig.roleName}
                </p>
                <p className="text-[10px] text-gray-400 truncate font-medium">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-600 font-black py-4 rounded-[1.5rem] hover:bg-rose-600 hover:text-white transition-all duration-300 group"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    );
  },
);

export default Sidebar;
