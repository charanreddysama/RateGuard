import {
  LayoutDashboard,
  Shield,
  BarChart3,
  Key,
  Settings,
  BookOpen,
  Layers3,
  TerminalSquare,
  UserCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { cn } from "../../lib/utils";
import { AuthContext } from "../../context/AuthContext";

function DashboardLayout({ children }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const links = [
    { icon: BookOpen, label: "Docs", path: "/dashboard/docs" },
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", exact: true },
    { icon: Layers3, label: "Projects", path: "/dashboard/projects" },
    { icon: Key, label: "API Keys", path: "/dashboard/api-keys" },
    { icon: Shield, label: "Rules", path: "/dashboard/rules" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: TerminalSquare, label: "Playground", path: "/dashboard/playground" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" }
  ];

  return (
    <section className="min-h-screen flex bg-[var(--bg-secondary)]">
      {/* SIDEBAR */}
      <aside className="w-[280px] flex-shrink-0 bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] flex flex-col h-screen sticky top-0">
        
        {/* LOGO */}
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--brand-primary)] rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              RateGuard
            </h1>
          </Link>
        </div>

        {/* LINKS */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const active = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  active 
                    ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                <Icon size={18} className={cn(active ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM */}
        <div className="p-4 border-t border-[var(--border-subtle)] space-y-4">
          <div className="px-3 flex items-center justify-between">
            <ThemeToggle />
            <button 
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-red-500 transition-colors"
              title="Logout"
            >
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2 bg-[var(--bg-secondary)] rounded-md border border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
              <UserCircle size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                {user?.name || "Admin User"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-x-hidden p-8 lg:p-12">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </section>
  );
}

export default DashboardLayout;