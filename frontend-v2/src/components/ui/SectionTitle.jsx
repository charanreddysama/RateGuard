function SectionTitle({

  badge,
  title,
  subtitle

}) {

  return (

    <div
      className="
      text-center

      max-w-[900px]

      mx-auto

      mb-20
    "
    >

      {/* BADGE */}

      <p
        className="
        uppercase

        tracking-[5px]

        text-xs

        text-indigo-400

        mb-5
      "
      >
        {badge}
      </p>

      {/* TITLE */}

      <h2
        className="
        text-[52px]
        lg:text-[72px]

        leading-[1]

        tracking-[-4px]

        font-[850]
      "
      >
        {title}
      </h2>

      {/* SUBTITLE */}

      <p
        className="
        mt-8

        text-[22px]

        leading-[1.8]

        text-[var(--text-secondary)]
      "
      >
        {subtitle}
      </p>

    </div>

  );
}

export default SectionTitle;