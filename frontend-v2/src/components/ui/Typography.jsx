import { cn }
from "../../lib/utils";

/* SMALL BADGE */

export function SectionBadge({
  children
}) {

  return (

    <div
      className="
      inline-flex
      items-center

      gap-3

      glass

      rounded-full

      px-5
      py-3
    "
    >

      <div
        className="
        w-2
        h-2

        rounded-full

        bg-emerald-400
      "
      />

      <p
        className="
        text-[11px]
        md:text-[12px]

        uppercase

        tracking-[3px]

        text-[var(--text-secondary)]
      "
      >
        {children}
      </p>

    </div>
  );
}

/* BIG TITLES */

export function SectionTitle({
  children,
  className
}) {

  return (

    <h1

      className={cn(

        `
        font-[800]

        leading-[0.95]

        tracking-[-3px]

        text-balance

        text-[52px]
        sm:text-[64px]
        md:text-[74px]
        lg:text-[84px]

        max-w-[700px]
        `,

        className
      )}
    >

      {children}

    </h1>
  );
}

/* DESCRIPTION */

export function SectionDescription({
  children,
  className
}) {

  return (

    <p

      className={cn(

        `
        text-[17px]
        md:text-[19px]

        leading-[1.8]

        text-[var(--text-secondary)]

        max-w-[620px]
        `,

        className
      )}
    >

      {children}

    </p>
  );
}