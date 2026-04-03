import { useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import Reveal from "~/components/Reveal";
import ScrambleText from "~/components/ScrambleText";
import BackgroundGlow from "~/components/ui/BackgroundGlow";
import { useInView } from "~/hooks/useInView";

export type GroupName = "Software Development" | "Cloud and Infrastructure";

export interface TypeInterestGroup {
  readonly name: GroupName;
  readonly description: string;
}

interface InterestGroupsProps {
  interestGroups: readonly TypeInterestGroup[];
  getClubDetails: (club: GroupName) => string[];
}

export default function InterestGroups(props: InterestGroupsProps) {
  const rowsRef = useRef<HTMLDivElement>(null);
  const isRowsInView = useInView(rowsRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px",
  });

  return (
    <section
      id="interest-groups"
      aria-labelledby="divisions-heading"
      className="relative bg-white dark:bg-neutral-950 border-y border-gray-200 dark:border-neutral-800 overflow-hidden"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 800px",
      }}
    >
      <BackgroundGlow />
      <div className="max-w-480 mx-auto w-full sm:border-x border-gray-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200 dark:border-neutral-800">
          <div className="lg:col-span-4 p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-800 bg-hatching relative">
            <Reveal>
              <ScrambleText
                as="p"
                text="Divisions"
                className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400"
              />
            </Reveal>
            <span
              className="absolute bottom-2 right-4 text-[4rem] sm:text-[6rem] font-mono font-bold leading-none text-gray-100 dark:text-neutral-800 select-none pointer-events-none"
              aria-hidden="true"
            >
              04
            </span>
          </div>
          <div className="lg:col-span-8 p-6 sm:p-12">
            <Reveal delay={0.1}>
              <h2
                id="divisions-heading"
                className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-neutral-100 leading-tight"
              >
                Specialized research groups focused on core pillars of modern computing.
              </h2>
            </Reveal>
          </div>
        </div>

        <div ref={rowsRef}>
          {props.interestGroups.map((club, index) => (
            <GroupRow
              key={club.name}
              club={club}
              index={index}
              details={props.getClubDetails(club.name)}
              isVisible={isRowsInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GroupRow({
  club,
  index,
  details,
  isVisible,
}: {
  club: TypeInterestGroup;
  index: number;
  details: string[];
  isVisible: boolean;
}) {
  return (
    <article
      className={[
        "group grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200 dark:border-neutral-800",
        "hover:bg-gray-50 dark:hover:bg-neutral-900 transition-[opacity,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "bg-white dark:bg-neutral-950",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
        contain: "layout paint",
      }}
    >
      <div className="lg:col-span-1 p-6 sm:p-8 lg:border-r border-gray-200 dark:border-neutral-800 hidden lg:block">
        <span className="font-mono text-sm text-gray-400 dark:text-neutral-600">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="lg:col-span-7 p-6 sm:p-8 lg:border-r border-gray-200 dark:border-neutral-800">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-neutral-100">{club.name}</h3>
        </div>
        <p className="text-lg text-gray-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
          {club.description}
        </p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {details.map((detail, i) => (
            <li
              key={detail}
              className={[
                "text-sm text-gray-500 dark:text-neutral-400 flex items-center gap-2",
                "transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2.5",
              ].join(" ")}
              style={{
                transitionDelay: isVisible ? `${300 + index * 150 + i * 60}ms` : "0ms",
              }}
            >
              <span
                className="w-1 h-1 bg-gray-400 dark:bg-neutral-600 rounded-full"
                aria-hidden="true"
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-between lg:justify-end">
        <span className="lg:hidden font-mono text-sm text-gray-400 dark:text-neutral-600">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        <BsArrowRight
          className="w-6 h-6 text-gray-300 dark:text-neutral-600 group-hover:text-gray-900 dark:group-hover:text-apple-blue-400 transform group-hover:translate-x-2 transition-[color,transform] duration-300"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
