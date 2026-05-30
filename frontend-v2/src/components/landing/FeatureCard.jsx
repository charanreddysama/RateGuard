import { motion }
from "framer-motion";

function FeatureCard({

  title,
  description,
  icon

}) {

  return (

    <motion.div

    

      whileHover={{
        y: -6
      }}

      transition={{
        duration: 0.25
      }}

      className="
relative

glass

rounded-[30px]

p-8

overflow-hidden

border

border-white/[0.05]

hover:border-sky-400/20

transition-all
duration-300

hover:shadow-[0_20px_60px_rgba(56,189,248,0.08)]
"
    >

      {/* TOP GLOW */}

<div
  className="
  absolute

  top-[-60px]
  right-[-60px]

  w-[140px]
  h-[140px]

  rounded-full

  bg-sky-400/10

  blur-[60px]
"
/>  

      {/* ICON */}

      <div
        className="
        w-14
        h-14

        rounded-2xl

        flex
        items-center
        justify-center

        mb-6

        bg-gradient-to-br
        from-indigo-500/20
        to-sky-500/20
      "
      >

        <div className="text-sky-400">

          {icon}

        </div>

      </div>

      {/* TITLE */}

      <h3
        className="
        text-[24px]

        font-[700]

        mb-4
      "
      >
        {title}
      </h3>

      {/* DESCRIPTION */}

      <p
        className="
        leading-[1.8]

        text-[var(--text-secondary)]
      "
      >
        {description}
      </p>

    </motion.div>
  );
}

export default FeatureCard;