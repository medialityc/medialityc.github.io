"use client";
import { useEffect, useState } from "react";

// Returns a normalized scroll progress (0 - 1) based on document height.
// Applies easing for smoother downstream animations.
export function useScrollProgress(ease: boolean = true, clampMax: number = 1) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      let raw = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      if (clampMax < 1) {
        raw = Math.min(raw, clampMax);
      }
      // Ease out cubic for smoother entrance of motion
      const eased = ease ? 1 - Math.pow(1 - raw, 3) : raw;
      setProgress(eased);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ease]);

  return progress;
}
