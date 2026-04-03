import type React from "react";
import { useEffect, useRef, useState } from "react";

export function useInView(
  ref: React.RefObject<Element | null>,
  options?: {
    once?: boolean;
    amount?: number;
    margin?: string;
  },
): boolean {
  const [isInView, setIsInView] = useState(false);
  const once = options?.once ?? false;
  const amount = options?.amount ?? 0;
  const margin = options?.margin ?? "0px";

  const firedRef = useRef(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const el = ref.current;
    if (!el || (once && firedRef.current)) return;

    const timeoutId = setTimeout(() => {
      const currentEl = ref.current;
      if (!currentEl) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              firedRef.current = true;
              observer?.disconnect();
            }
          } else if (!once) {
            setIsInView(false);
          }
        },
        {
          threshold: amount,
          rootMargin: margin,
        },
      );

      observer.observe(currentEl);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [ref, once, amount, margin]);

  return isInView;
}
