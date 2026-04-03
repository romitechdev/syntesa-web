import { useRef } from "react";
import type { IconType } from "react-icons";
import Reveal from "~/components/Reveal";
import ScrambleText from "~/components/ScrambleText";
import GradientOrb from "~/components/ui/GradientOrb";
import { useInView } from "~/hooks/useInView";

export interface TypeLabSpec {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
  readonly icon?: IconType;
}

interface InfrastructureProps {
  specs: readonly TypeLabSpec[];
}

export default function Infrastructure({ specs }: InfrastructureProps) {
  const gridRef = useRef<HTMLDListElement>(null);
  const isGridInView = useInView(gridRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -50px 0px",
  });

  return (
    <section
      aria-labelledby="infrastructure-heading"
      className="relative bg-white dark:bg-neutral-950 border-y border-gray-200 dark:border-neutral-800 overflow-hidden"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 600px",
      }}
    >
      <GradientOrb color="orange" position="bottom-left" size="lg" />

      <div className="max-w-480 mx-auto w-full sm:border-x border-gray-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200 dark:border-neutral-800">
          <div className="lg:col-span-4 p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-800 bg-hatching relative">
            <Reveal>
              <ScrambleText
                as="p"
                text="Infrastructure"
                className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400"
              />
            </Reveal>
            <span
              className="absolute bottom-2 right-4 text-[4rem] sm:text-[6rem] font-mono font-bold leading-none text-gray-100 dark:text-neutral-800 select-none pointer-events-none"
              aria-hidden="true"
            >
              03
            </span>
          </div>
          <div className="lg:col-span-8 p-6 sm:p-12">
            <Reveal delay={0.1}>
              <h2
                id="infrastructure-heading"
                className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-neutral-100 leading-tight"
              >
                Resources powering our research.
              </h2>
            </Reveal>
          </div>
        </div>

        <dl ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, index) => (
            <SpecCell
              key={spec.label}
              spec={spec}
              index={index}
              total={specs.length}
              isVisible={isGridInView}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

function SpecCell({
  spec,
  index,
  total,
  isVisible,
}: {
  spec: TypeLabSpec;
  index: number;
  total: number;
  isVisible: boolean;
}) {
  const isLeftInPair = index % 2 === 0;
  const isNotLastInTriple = index % 3 !== 2;
  const isLastRow2 = index >= total - (total % 2 === 0 ? 2 : 1);
  const isLastRow3 = index >= total - (total % 3 === 0 ? 3 : total % 3);

  return (
    <div
      className={[
        "p-6 sm:p-8 lg:p-10",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        isLeftInPair ? "border-r border-gray-200 dark:border-neutral-800" : "",
        !isLastRow2 ? "border-b border-gray-200 dark:border-neutral-800" : "",
        isNotLastInTriple ? "lg:border-r" : "lg:border-r-0",
        isLastRow3 ? "lg:border-b-0" : "lg:border-b",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: isVisible ? `${index * 60}ms` : "0ms" }}
    >
      {spec.icon && (
        <spec.icon className="size-5 text-gray-400 dark:text-neutral-500 mb-3" aria-hidden="true" />
      )}
      <dt className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-3">
        {spec.label}
      </dt>
      <dd className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-neutral-100 leading-tight">
        {spec.value}
        {spec.detail && (
          <span className="block text-sm text-gray-400 dark:text-neutral-500 mt-2">
            {spec.detail}
          </span>
        )}
      </dd>
    </div>
  );
}
