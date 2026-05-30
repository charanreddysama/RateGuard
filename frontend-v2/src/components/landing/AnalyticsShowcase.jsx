import TrafficChart
from "../analytics/TrafficChart";

function AnalyticsShowcase() {

  return (

    <section
      id="analytics"

      className="
      px-6
      lg:px-8

      py-28
    "
    >

      <div
        className="
        container-width
      "
      >

        {/* TOP */}

        <div
          className="
          text-center

          mb-20
        "
        >

          <p
            className="
            uppercase

            tracking-[4px]

            text-[12px]

            text-indigo-400

            mb-6
          "
          >
            ANALYTICS
          </p>

          <h2
            className="
            text-[42px]
            lg:text-[58px]

            font-[800]

            tracking-[-3px]

            mb-6
          "
          >

            Real-time traffic

            <br />

            visibility.

          </h2>

          <p
            className="
            max-w-2xl

            mx-auto

            text-[20px]

            leading-[1.8]

            text-[var(--text-secondary)]
          "
          >

            Monitor requests,
            blocked traffic,
            latency,
            usage patterns,
            and distributed API activity.

          </p>

        </div>

        {/* PANEL */}

        <div
          className="
          glass

          rounded-[40px]

          p-8
          lg:p-12
        "
        >

          {/* TOP STATS */}

          <div
            className="
            grid
            md:grid-cols-4

            gap-6

            mb-12
          "
          >

            {[
              "1.2M Requests",
              "18K Blocked",
              "12ms Latency",
              "248 APIs"
            ].map((item) => (

              <div
                key={item}

                className="
                rounded-3xl

                bg-white/[0.03]

                p-6
              "
              >

                <h3
                  className="
                  text-[28px]

                  font-[700]
                "
                >
                  {item}
                </h3>

              </div>

            ))}

          </div>

          {/* LARGE GRAPH */}

          <div
            className="
            relative

            h-[420px]

            rounded-[32px]

            overflow-hidden

            bg-gradient-to-b
            from-sky-500/5
            to-indigo-500/5
          "
          >
            <TrafficChart />

          </div>

        </div>

      </div>

    </section>
  );
}

export default AnalyticsShowcase;