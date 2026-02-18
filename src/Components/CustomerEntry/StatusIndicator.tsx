export const StatusIndicator = ({
  color,
  label,
  pulse,
}: {
  color: string;
  label: string;
  pulse?: boolean;
}) => (
  <span className="flex items-center gap-1">
    <span
      className={`w-2 h-2 rounded-full ${color} ${pulse ? "animate-pulse" : ""}`}
    />
    {label}
  </span>
);
