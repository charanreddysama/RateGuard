import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  Shield,
  BarChart3,
  Settings,
  BookOpen,
  UserCircle
} from "lucide-react";

function Sidebar() {
  const { user } = useContext(AuthContext);

  const menu = [
    {
      icon: BookOpen,
      label: "Documentation",
      path: "/dashboard/docs"
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: FolderKanban,
      label: "Projects",
      path: "/dashboard/projects"
    },
    {
      icon: Shield,
      label: "Rules",
      path: "/dashboard/rules"
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/dashboard/analytics"
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/settings"
    }
  ];

  return (
    <aside className="fixed left-0 top-16 w-[280px] h-[calc(100vh-64px)] border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-6 py-8 flex flex-col justify-between">
      <div>
        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            // Handle exact matching for dashboard home
            const isHome = item.path === "/dashboard";
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={isHome}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive
                      ? "bg-[var(--brand-primary)] text-white"
                      : "text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center">
              <UserCircle size={20} />
            </div>
            <p className="text-sm font-bold text-[var(--text-primary)] truncate">
              {user?.name || "Admin User"}
            </p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;