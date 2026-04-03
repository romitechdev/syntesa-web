import { useRef, useState } from "react";
import Reveal from "~/components/Reveal";
import ScrambleText from "~/components/ScrambleText";
import GradientOrb from "~/components/ui/GradientOrb";
import { useInView } from "~/hooks/useInView";

export interface TypeSenior {
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly logo: string;
  readonly prodi: string;
  readonly batch: string;
}

interface SeniorsProps {
  seniors: readonly TypeSenior[];
}

export default function Seniors({ seniors }: SeniorsProps) {
  const marqueeRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMarqueeInView = useInView(marqueeRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -50px 0px",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const safeSeniors = Array.isArray(seniors) ? seniors : [];
  const DURATION = 60;
  const isPaused = isHovered || isDragging || !isMarqueeInView;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (trackRef.current) {
      const transform = getComputedStyle(trackRef.current).transform;
      const matrix = new DOMMatrix(transform);
      setDragOffset(matrix.m41);
      trackRef.current.style.animation = "none";
      trackRef.current.style.transform = `translateX(${matrix.m41}px)`;
    }
  };

  const resumeFromPosition = () => {
    const track = trackRef.current;
    if (!track) return;
    const matrix = new DOMMatrix(getComputedStyle(track).transform);
    const currentX = matrix.m41;
    const halfWidth = track.scrollWidth / 2;
    const normX = ((-currentX % halfWidth) + halfWidth) % halfWidth;
    const progress = normX / halfWidth;
    const offset = progress * DURATION;
    track.style.transform = "";
    track.style.animation = "";
    track.style.animationDelay = `-${offset}s`;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    resumeFromPosition();
  };

  const handlePointerLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      resumeFromPosition();
    }
    setIsHovered(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const walk = (e.clientX - startX) * 2;
    trackRef.current.style.transform = `translateX(${dragOffset + walk}px)`;
  };

  return (
    <section
      aria-labelledby="placements-heading"
      className="relative bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800 overflow-hidden"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 700px",
      }}
    >
      <GradientOrb color="green" position="top-right" size="md" />
      <div className="max-w-480 mx-auto w-full sm:border-x border-gray-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200 dark:border-neutral-800">
          <div className="lg:col-span-4 p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-800 bg-hatching relative">
            <Reveal>
              <ScrambleText
                as="p"
                text="Internships"
                className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400"
              />
            </Reveal>
            <span
              className="absolute bottom-2 right-4 text-[4rem] sm:text-[6rem] font-mono font-bold leading-none text-gray-100 dark:text-neutral-800 select-none pointer-events-none"
              aria-hidden="true"
            >
              05
            </span>
          </div>
          <div className="lg:col-span-8 p-6 sm:p-12">
            <Reveal delay={0.1}>
              <h2
                id="placements-heading"
                className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-neutral-100 leading-tight"
              >
                Where our members have interned.
              </h2>
            </Reveal>
          </div>
        </div>

        <section
          ref={marqueeRef}
          aria-label="Interactive internships marquee"
          className={`overflow-hidden relative transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-b border-gray-200 dark:border-neutral-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${isMarqueeInView ? "opacity-100" : "opacity-0"}`}
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "0 200px",
            touchAction: "pan-y",
          }}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          <div
            ref={trackRef}
            className="flex motion-safe:animate-[marquee-scroll_60s_linear_infinite]"
            style={{
              width: "fit-content",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
                {safeSeniors.length > 0 ? (
                  safeSeniors.map((senior) => (
                    <SeniorCell key={`senior-${half}-${senior.name}`} senior={senior} />
                  ))
                ) : (
                  <div className="p-6 text-gray-500">Loading data...</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function SeniorCell({ senior }: { senior: TypeSenior }) {
  return (
    <article
      className={[
        "group p-6 sm:p-10 transition-[background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "w-75 sm:w-87.5 shrink-0",
        "hover:bg-gray-50 dark:hover:bg-neutral-900",
        "border-r border-gray-200 dark:border-neutral-800",
        "select-none",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <figure className="mb-6 pointer-events-none">
        <img
          src={senior.logo}
          alt={senior.company}
          className="h-10 w-10 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-500"
          loading="lazy"
          draggable="false"
        />
      </figure>

      <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-neutral-100 leading-tight truncate pointer-events-none">
        {senior.company}
      </h3>

      <p className="text-base text-gray-500 dark:text-neutral-400 mt-2 truncate pointer-events-none">
        {senior.name}
      </p>
      <p className="text-sm text-gray-400 dark:text-neutral-500 mt-0.5 truncate pointer-events-none">
        {senior.role}
      </p>

      <div className="flex items-center gap-3 mt-4 pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-neutral-500 border border-gray-200 dark:border-neutral-800 px-2.5 py-1 group-hover:border-gray-300 dark:group-hover:border-neutral-700 transition-colors duration-300">
          {senior.prodi}
        </span>
        <time
          dateTime={senior.batch}
          className="text-xs font-mono text-gray-400 dark:text-neutral-600"
        >
          {senior.batch}
        </time>
      </div>
    </article>
  );
}
