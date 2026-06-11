import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";

function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <section className="min-h-screen flex items-center pt-32 pb-16">
      <div className="container-width grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              Enterprise Grade Protection
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight font-[850] text-balance break-words">
            Protect your APIs from <span className="gradient-text whitespace-normal">DDoS attacks</span> & abuse.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Handle multiple requests securely. Centralized rate limiting, abuse prevention, and distributed API protection powered by Redis infrastructure.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex items-center gap-4">
            <Link to={user ? "/dashboard" : "/register"}>
              <Button className="h-12 px-8 text-base">Start Free</Button>
            </Link>
            <Link to={user ? "/dashboard/docs" : "/login"}>
              <Button variant="outline" className="h-12 px-8 text-base bg-transparent border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
                View Docs
              </Button>
            </Link>
          </div>

          {/* STACK MARQUEE */}
          <div className="mt-16 w-full max-w-full overflow-hidden relative">
            <p className="text-xs tracking-widest font-semibold uppercase text-[var(--text-muted)] mb-4">
              Works with tech stack below
            </p>
            {/* Fade overlays for the marquee edges */}
            <div className="absolute left-0 top-10 bottom-0 w-12 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10"></div>
            <div className="absolute right-0 top-10 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10"></div>
            
            <div className="flex animate-marquee gap-8 items-center text-xl font-medium text-[var(--text-secondary)]">
              {/* Duplicate array for seamless infinite scrolling */}
              {[...["Node.js", "Spring Boot", "Python", "Express", "Django", "FastAPI", "React"], ...["Node.js", "Spring Boot", "Python", "Express", "Django", "FastAPI", "React"]].map((item, i) => (
                <span key={i} className="px-4">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative lg:block hidden"
        >
          <div className="glass-card p-8 bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-xl relative z-10">
            {/* TOP */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[var(--text-secondary)] font-medium mb-1">Total Requests Protected</p>
                <h2 className="text-5xl font-extrabold tracking-tight">1.2M</h2>
              </div>
              <div className="bg-emerald-400/10 rounded-lg px-3 py-1 border border-emerald-400/20">
                <p className="text-emerald-500 font-bold text-sm">+18%</p>
              </div>
            </div>

            {/* GRAPH DECORATION */}
            <div className="h-[200px] rounded-xl border border-[var(--border-subtle)] bg-gradient-to-b from-sky-400/5 to-transparent overflow-hidden relative mb-8">
              <svg viewBox="0 0 500 200" className="absolute inset-0 w-full h-full opacity-60">
                <path
                  d="M0 170 C50 140, 120 100, 180 110 S300 60, 350 70 S450 40, 500 10"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Blocked", "18K"],
                ["Projects", "48"],
                ["Latency", "12ms"]
              ].map(([label, value]) => (
                <div key={label} className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{value}</h3>
                  <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[100px] -z-10 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;