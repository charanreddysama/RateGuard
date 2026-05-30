// Framer motion
import { motion }
from "framer-motion";

function TrustedBy() {

  const stacks = [

    "Node.js",
    "Express",
    "Redis",
    "MongoDB",
    "Spring Boot",
    "Python",
    "Docker",
    "Kubernetes"

  ];

  return (

    <section
      className="
      px-6
      lg:px-8

      py-24
    "
    >

      <div
        className="
        container-width
      "
      >

        {/* TITLE */}

        <div
          className="
          text-center

          mb-14
        "
        >

          <p
            className="
            uppercase

            tracking-[4px]

            text-[12px]

            text-[var(--text-secondary)]
          "
          >

            Built for modern backend infrastructure

          </p>

        </div>

        {/* STACK ROW */}

        <div
          className="
          flex
          flex-wrap

          justify-center

          gap-6
        "
        >

          {stacks.map((item) => (

            <motion.div

              whileHover={{
                y: -4
              }}

              key={item}

              className="
              glass

              rounded-2xl

              px-8
              py-5

              text-[18px]

              text-[var(--text-secondary)]
            "
            >

              {item}

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TrustedBy;