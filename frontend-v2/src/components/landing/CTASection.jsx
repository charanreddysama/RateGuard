import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function CTASection() {
  const { user } = useContext(AuthContext);

  return (
    <section className="px-6 lg:px-8 py-32">
      <div className="container-width">
        <div className="relative overflow-hidden rounded-[42px] p-10 lg:p-20 glass">
          {/* GLOW */}
          <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-indigo-500/10 blur-[120px]" />

          {/* CONTENT */}
          <div className="relative text-center">
            <p className="uppercase tracking-[4px] text-[12px] text-indigo-400 mb-6">
              GET STARTED
            </p>

            <h2 className="text-[42px] lg:text-[64px] font-[800] tracking-[-3px] leading-[1.1] mb-8">
              Protect your APIs
              <br />
              with RateGuard.
            </h2>

            <p className="max-w-2xl mx-auto text-[20px] leading-[1.8] text-[var(--text-secondary)] mb-10">
              Distributed Redis-powered middleware infrastructure for modern applications and developer platforms.
            </p>

            <div className="flex justify-center gap-5 flex-wrap">
              <Link to={user ? "/dashboard" : "/register"}>
                <Button size="lg">
                  Start Free
                </Button>
              </Link>

              <Link to={user ? "/dashboard/docs" : "/login"}>
                <Button variant="secondary" size="lg">
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;