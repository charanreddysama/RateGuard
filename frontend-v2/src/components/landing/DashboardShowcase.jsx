import {

  Activity,
  Shield,
  Key,
  BarChart3,
  Database,
  Layers3

} from "lucide-react";

import {

  motion

} from "framer-motion";

import SectionTitle
from "../ui/SectionTitle";

function DashboardShowcase() {

  const menu = [

    {
      icon:BarChart3,
      label:"Analytics"
    },

    {
      icon:Shield,
      label:"Rate Limits"
    },

    {
      icon:Key,
      label:"API Keys"
    },

    {
      icon:Database,
      label:"Redis"
    },

    {
      icon:Layers3,
      label:"Projects"
    }

  ];

  return (

    <section
      className="
      section-spacing
    "
    >

      <div className="container-width">

        {/* TITLE */}

        <SectionTitle

          badge="Dashboard"

          title="Control infrastructure from one platform"

          subtitle="
          Manage API keys,
          distributed rate limits,
          Redis counters,
          analytics,
          and security rules
          from a unified dashboard.
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

          rounded-[42px]

          overflow-hidden
        "
        >

          <div
            className="
            grid
            lg:grid-cols-[260px_1fr]
          "
          >

            {/* SIDEBAR */}

            <div
              className="
              border-r

              border-white/[0.06]

              p-6
            "
            >

              {/* LOGO */}

              <h2
                className="
                text-[36px]

                font-[850]

                tracking-[-3px]

                mb-10
              "
              >

                Rate

                <span className="gradient-text">
                  Guard
                </span>

              </h2>

              {/* MENU */}

              <div
                className="
                flex
                flex-col

                gap-3
              "
              >

                {menu.map((item,index)=>{

                  const Icon =
                    item.icon;

                  return (

                    <div

                      key={item.label}

                      className={`
                      
                      flex
                      items-center

                      gap-4

                      px-5
                      py-4

                      rounded-2xl

                      transition-all

                      ${
                        index === 0

                        ?

                        "bg-indigo-500/15 border border-indigo-500/20"

                        :

                        "hover:bg-white/[0.03]"
                      }
                      
                      `}
                    >

                      <Icon
                        size={20}

                        className="
                        text-indigo-400
                      "
                      />

                      <span
                        className="
                        text-[16px]

                        font-[500]
                      "
                      >
                        {item.label}
                      </span>

                    </div>

                  );

                })}

              </div>

            </div>

            {/* MAIN */}

            <div
              className="
              p-8
            "
            >

              {/* TOP */}

              <div
                className="
                flex
                items-center
                justify-between

                mb-8
              "
              >

                <div>

                  <p
                    className="
                    text-[var(--text-secondary)]
                  "
                  >
                    Total Requests
                  </p>

                  <h2
                    className="
                    text-[72px]

                    font-[850]

                    tracking-[-4px]
                  "
                  >
                    1.8M
                  </h2>

                </div>

                <div
                  className="
                  glass

                  rounded-2xl

                  px-5
                  py-4
                "
                >

                  <p
                    className="
                    text-emerald-400

                    font-[700]
                  "
                  >
                    +24%
                  </p>

                </div>

              </div>

              {/* GRAPH */}

              <div
                className="
                h-[320px]

                rounded-[32px]

                border

                border-white/[0.05]

                bg-gradient-to-b
                from-sky-500/10
                to-transparent

                relative

                overflow-hidden
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

              {/* STATS */}

              <div
                className="
                grid
                lg:grid-cols-4

                gap-5

                mt-8
              "
              >

                {[
                  ["Blocked","22K"],
                  ["Latency","11ms"],
                  ["Projects","48"],
                  ["Active APIs","248"]
                ].map(([label,value])=>(

                  <div

                    key={label}

                    className="
                    glass

                    rounded-3xl

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
                      text-[40px]

                      font-[850]

                      tracking-[-2px]
                    "
                    >
                      {value}
                    </h3>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default DashboardShowcase;