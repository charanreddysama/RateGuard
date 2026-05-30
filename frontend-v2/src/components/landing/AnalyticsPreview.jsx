import {

  motion

} from "framer-motion";

import SectionTitle
from "../ui/SectionTitle";

function AnalyticsPreview() {

  return (

    <section
      id="analytics"

      className="
      section-spacing
    "
    >

      <div className="container-width">

        {/* TITLE */}

        <SectionTitle

          badge="Analytics"

          title="Observe traffic in real time"

          subtitle="
          Monitor requests,
          blocked traffic,
          latency spikes,
          and usage patterns
          from one unified dashboard.
          "
        />

        {/* DASHBOARD */}

        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:0.5
          }}

          className="
          glass

          rounded-[40px]

          p-8
        "
        >

          {/* TOP STATS */}

          <div
            className="
            grid
            lg:grid-cols-4

            gap-5

            mb-8
          "
          >

            {[
              ["Requests","1.2M"],
              ["Blocked","18K"],
              ["Latency","12ms"],
              ["Projects","48"]
            ].map(([label,value])=>(

              <div

                key={label}

                className="
                rounded-3xl

                bg-white/[0.03]

                border

                border-white/[0.06]

                p-6
              "
              >

                <p
                  className="
                  text-[var(--text-secondary)]

                  mb-3
                "
                >
                  {label}
                </p>

                <h3
                  className="
                  text-[44px]

                  font-[850]

                  tracking-[-2px]
                "
                >
                  {value}
                </h3>

              </div>

            ))}

          </div>

          {/* GRAPH */}

          <div
            className="
            h-[400px]

            rounded-[36px]

            bg-gradient-to-b
            from-sky-500/10
            to-transparent

            border

            border-white/[0.05]

            overflow-hidden

            relative
          "
          >

            <svg
              viewBox="0 0 1200 400"

              className="
              absolute
              inset-0

              w-full
              h-full
            "
            >

              <path

                d="
                M0 320

                C120 280,
                220 190,
                340 210

                S560 120,
                680 160

                S860 80,
                980 110

                S1120 40,
                1200 70
                "

                fill="none"

                stroke="#38bdf8"

                strokeWidth="6"
              />

            </svg>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default AnalyticsPreview;