import DashboardLayout
from "../../components/dashboard/DashboardLayout";

import DashboardHeader
from "../../components/dashboard/DashboardHeader";

function DashboardPage() {

  return (

    <DashboardLayout>

      {/* HEADER */}

      <DashboardHeader

        title="Overview"

        subtitle="
        Monitor traffic,
        projects,
        rate limits,
        and distributed API infrastructure.
        "
      />

      {/* STATS */}

      <div
        className="
        grid
        lg:grid-cols-4

        gap-6
      "
      >

        {[
          ["Requests","1.8M"],
          ["Blocked","22K"],
          ["Projects","48"],
          ["Latency","11ms"]
        ].map(([label,value])=>(

          <div

            key={label}

            className="
            glass

            rounded-[32px]

            p-7
          "
          >

            <p
              className="
              text-[var(--text-secondary)]

              mb-4
            "
            >
              {label}
            </p>

            <h2
              className="
              text-[52px]

              font-[850]

              tracking-[-3px]
            "
            >
              {value}
            </h2>

          </div>

        ))}

      </div>

      {/* CHART */}

      <div
        className="
        glass

        rounded-[40px]

        p-8

        mt-8
      "
      >

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

              mb-2
            "
            >
              Traffic Analytics
            </p>

            <h2
              className="
              text-[40px]

              font-[850]

              tracking-[-2px]
            "
            >
              Requests Overview
            </h2>

          </div>

          <div
            className="
            glass

            rounded-2xl

            px-5
            py-3
          "
          >

            Last 7 days

          </div>

        </div>

        {/* GRAPH */}

        <div
          className="
          h-[360px]

          rounded-[32px]

          border

          border-white/[0.06]

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

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;