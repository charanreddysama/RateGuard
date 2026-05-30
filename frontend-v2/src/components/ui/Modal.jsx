import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  className
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-xl pointer-events-auto",
                className
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
