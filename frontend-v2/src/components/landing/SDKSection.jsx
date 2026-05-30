import {

  Copy,
  TerminalSquare,
  CheckCircle2

} from "lucide-react";

import {

  motion

} from "framer-motion";

import SectionTitle
from "../ui/SectionTitle";

function SDKSection() {

  return (

    <section
      id="sdk"

      className="
      section-spacing
    "
    >

      <div className="container-width">

        {/* TITLE */}

        <SectionTitle

          badge="SDK & Integration"

          title="Integrate in minutes"

          subtitle="
          Add distributed Redis-powered
          rate limiting to your backend
          using our middleware SDKs
          and universal API layer.
          "
        />

        {/* GRID */}

        <div
          className="
          grid
          lg:grid-cols-2

          gap-10

          items-center
        "
        >

          {/* LEFT */}

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

            rounded-[36px]

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

              <div
                className="
                flex
                items-center

                gap-3
              "
              >

                <TerminalSquare
                  size={22}

                  className="
                  text-indigo-400
                "
                />

                <h3
                  className="
                  text-[26px]

                  font-[800]
                "
                >
                  Installation
                </h3>

              </div>

              <button
                className="
                w-[44px]
                h-[44px]

                rounded-xl

                glass

                flex
                items-center
                justify-center
              "
              >

                <Copy size={18} />

              </button>

            </div>

            {/* CODE BLOCK */}

            <div
              className="
              rounded-[28px]

              bg-[#07111d]

              border

              border-white/[0.06]

              p-6

              overflow-hidden
            "
            >

              <pre
                className="
                text-[15px]

                leading-[2]

                text-slate-300

                overflow-x-auto
              "
              >

{`npm install @rateguard/sdk

import { rateGuard }
from "@rateguard/sdk"

app.use(rateGuard({

  apiKey:
  process.env.RATEGUARD_KEY,

  projectId:
  process.env.RATEGUARD_PROJECT

}))`}
              </pre>

            </div>

          </motion.div>

          {/* RIGHT */}

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
              duration:0.5,
              delay:0.1
            }}

            className="
            space-y-6
          "
          >

            {[
              "Express.js middleware integration",
              "Flask & FastAPI support",
              "Spring Boot integration",
              "Distributed Redis counters",
              "Universal Rate Limit API",
              "Real-time analytics sync"
            ].map((item)=>(

              <div

                key={item}

                className="
                glass

                rounded-2xl

                px-6
                py-5

                flex
                items-center

                gap-4
              "
              >

                <CheckCircle2
                  size={22}

                  className="
                  text-emerald-400
                "
                />

                <p
                  className="
                  text-[18px]

                  font-[500]
                "
                >
                  {item}
                </p>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default SDKSection;