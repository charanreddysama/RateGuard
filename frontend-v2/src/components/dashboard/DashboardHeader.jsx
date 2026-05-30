function DashboardHeader({

  title,
  subtitle,
  action

}) {

  return (

    <div
      className="
      flex
      flex-col
      lg:flex-row

      gap-6

      items-start
      lg:items-center

      justify-between

      mb-10
    "
    >

      {/* LEFT */}

      <div>

        <h1
          className="
          text-[56px]

          font-[850]

          tracking-[-4px]

          leading-none

          mb-4
        "
        >
          {title}
        </h1>

        <p
          className="
          text-[18px]

          text-[var(--text-secondary)]
        "
        >
          {subtitle}
        </p>

      </div>

      {/* RIGHT */}

      {action}

    </div>
  );
}

export default DashboardHeader;