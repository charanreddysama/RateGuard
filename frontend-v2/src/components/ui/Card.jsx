import { cn } from "../../lib/utils";

function Card({
  children,
  className,
  hover = false
}) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-sm",
        hover && "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[var(--brand-primary)]/30",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;