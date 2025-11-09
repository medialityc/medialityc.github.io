"use client";
import { useEffect, useRef, useState } from "react";

// Lightweight IntersectionObserver hook for scroll-based reveal animations.
// Returns a ref to attach to the target element and a boolean indicating visibility.
// Options can tune rootMargin & threshold for earlier/later activation.
export function useIntersection<T extends HTMLElement>(
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already observed / SSR safety
    if (inView) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // one-shot reveal
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.root, options.rootMargin, options.threshold]);

  return { ref, inView } as const;
}
