import type { LucideIcon } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: LucideIcon;
}

export const EntryInput = ({ label, Icon, ...props }: Props) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase mr-1">
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-orange-500 transition-colors" />
      <input
        {...props}
        className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-orange-500/30 focus:bg-white text-right pr-14 text-lg font-bold rounded-2xl transition-all shadow-inner outline-none"
      />
    </div>
  </div>
);
