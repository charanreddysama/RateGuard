import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

function Button({
  children,
  fullWidth = false,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className,
  disabled
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] disabled:opacity-50 disabled:pointer-events-none rounded-lg";
  
  const variants = {
    primary: "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] shadow-sm",
    secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--border-subtle)]",
    danger: "bg-[var(--danger)] text-white hover:bg-red-600",
    ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default Button;