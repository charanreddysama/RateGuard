// Animated motion
import { motion }
from "framer-motion";

function BackgroundOrbs() {

  return (

    <div
      className="
      fixed
      inset-0

      -z-50

      overflow-hidden

      pointer-events-none
    "
    >

      {/* BLUE ORB */}

      <motion.div

        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0]
        }}

        transition={{
          duration: 18,
          repeat: Infinity
        }}

        className="
        absolute

        top-[10%]
        left-[5%]

        w-[500px]
        h-[500px]

        rounded-full

        blur-[140px]
      "

        style={{
          background:
          "rgba(56,189,248,0.10)"
        }}
      />

      {/* INDIGO ORB */}

      <motion.div

        animate={{
          x: [0, -80, 0],
          y: [0, 50, 0]
        }}

        transition={{
          duration: 20,
          repeat: Infinity
        }}

        className="
        absolute

        bottom-[5%]
        right-[10%]

        w-[420px]
        h-[420px]

        rounded-full

        blur-[140px]
      "

        style={{
          background:
          "rgba(99,102,241,0.10)"
        }}
      />

    </div>
  );
}

export default BackgroundOrbs;