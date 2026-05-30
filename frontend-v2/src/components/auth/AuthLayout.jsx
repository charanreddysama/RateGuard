import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden bg-[var(--bg-secondary)]">
      {/* Decorative background blur */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--brand-primary)]/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[440px] z-10">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-[850] tracking-tight">
              Rate<span className="text-[var(--brand-primary)]">Guard</span>
            </h1>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 sm:p-10 shadow-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            <h2 className="text-2xl font-bold mb-2 text-center text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] text-center mb-8">
              {subtitle}
            </p>

            {children}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default AuthLayout;