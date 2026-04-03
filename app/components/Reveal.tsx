import {
  stagger as fmStagger,
  motion,
  type Transition,
  useAnimation,
  type Variant,
} from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";
import { useInView } from "~/hooks/useInView";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  margin?: string;
  once?: boolean;
  className?: string;
  clipReveal?: boolean;
  width?: "fit-content" | "100%";
}

const getHiddenVariant = (
  direction: RevealDirection,
  distance: number,
  clipReveal: boolean,
): Variant => {
  if (clipReveal) {
    const clips: Record<RevealDirection, string> = {
      up: "inset(100% 0 0 0)",
      down: "inset(0 0 100% 0)",
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
      none: "inset(0 0 0 0)",
    };
    return { clipPath: clips[direction], opacity: 0 };
  }

  const base: Variant = { opacity: 0 };
  switch (direction) {
    case "up":
      return { ...base, y: distance };
    case "down":
      return { ...base, y: -distance };
    case "left":
      return { ...base, x: distance };
    case "right":
      return { ...base, x: -distance };
    default:
      return base;
  }
};

const getVisibleVariant = (clipReveal: boolean): Variant => {
  if (clipReveal) {
    return { clipPath: "inset(0 0 0 0)", opacity: 1 };
  }
  return { opacity: 1, x: 0, y: 0 };
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  threshold = 0.15,
  margin = "0px 0px -50px 0px",
  once = true,
  className,
  clipReveal = false,
  width = "100%",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold, margin });

  const transition: Transition = {
    duration: prefersReducedMotion ? 0 : duration,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  };

  const shouldAnimate = isInView || prefersReducedMotion;

  return (
    <div ref={ref} style={{ width, overflow: clipReveal ? "hidden" : undefined }}>
      <motion.div
        variants={{
          hidden: getHiddenVariant(direction, distance, clipReveal),
          visible: getVisibleVariant(clipReveal),
        }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface LineRevealProps {
  className?: string;
  delay?: number;
  duration?: number;
  margin?: string;
}

export function LineReveal({
  className = "",
  delay = 0,
  duration = 0.8,
  margin = "0px 0px -50px 0px",
}: LineRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5, margin });
  const active = isInView || prefersReducedMotion;
  const durationMs = duration * 1000;
  const delayMs = delay * 1000;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="h-px w-full bg-gray-200 dark:bg-neutral-700 origin-left"
        style={{
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transition: prefersReducedMotion
            ? "none"
            : `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${active ? delayMs : 0}ms`,
        }}
      />
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  threshold?: number;
  margin?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  className,
  threshold = 0.1,
  margin = "0px 0px -50px 0px",
}: StaggerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView || prefersReducedMotion) {
      controls.start("visible");
    }
  }, [isInView, controls, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: prefersReducedMotion ? 0 : fmStagger(stagger) },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  className?: string;
  clipReveal?: boolean;
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 24,
  duration = 0.5,
  className,
  clipReveal = false,
}: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion
          ? getVisibleVariant(clipReveal)
          : getHiddenVariant(direction, distance, clipReveal),
        visible: getVisibleVariant(clipReveal),
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={clipReveal ? { overflow: "hidden" } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StaggerListProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  threshold?: number;
  margin?: string;
  as?: "ul" | "ol";
}

export function StaggerList({
  children,
  stagger = 0.1,
  className,
  threshold = 0.1,
  margin = "0px 0px -50px 0px",
  as = "ul",
}: StaggerListProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = as === "ul" ? motion.ul : motion.ol;
  const ref = useRef<HTMLUListElement | HTMLOListElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView || prefersReducedMotion) {
      controls.start("visible");
    }
  }, [isInView, controls, prefersReducedMotion]);

  return (
    <Component
      // @ts-expect-error: motion component ref types are complex
      ref={ref}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: prefersReducedMotion ? 0 : fmStagger(stagger) },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

interface StaggerListItemProps extends StaggerItemProps {
  as?: "li" | "div";
}

export function StaggerListItem({
  children,
  direction = "up",
  distance = 24,
  duration = 0.5,
  className,
  clipReveal = false,
  as = "li",
}: StaggerListItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      variants={{
        hidden: prefersReducedMotion
          ? getVisibleVariant(clipReveal)
          : getHiddenVariant(direction, distance, clipReveal),
        visible: getVisibleVariant(clipReveal),
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={clipReveal ? { overflow: "hidden" } : undefined}
    >
      {children}
    </Component>
  );
}
