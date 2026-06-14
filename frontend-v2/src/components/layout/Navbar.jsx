import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const authPage = location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = !!user;
  const navItems = ["Features", "SDK"];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]"
    >
      <div className="container-width">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <h1 className="text-2xl font-[850] tracking-tight leading-none">
              Rate<span className="text-[var(--brand-primary)]">Guard</span>
            </h1>
          </Link>

          {/* CENTER NAV */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="primary" className="h-10 text-sm">Dashboard</Button>
                </Link>
                <Button variant="secondary" className="h-10 text-sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : authPage ? (
              <Link to={location.pathname === "/login" ? "/register" : "/login"}>
                <Button variant="primary" className="h-10 text-sm">
                  {location.pathname === "/login" ? "Register" : "Login"}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="primary" className="h-10 text-sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;