"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "beneficios", label: "Beneficios" },
  { id: "services", label: "Servicios" },
  { id: "testimonios", label: "Testimonios" },
  { id: "contacto", label: "Contacto" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0); // scroll progress 0-1
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Scroll states & progress
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
      // While still in hero (before first content section), clear active highlight
      const firstSection = document.getElementById(sections[0].id);
      if (firstSection) {
        // Offset margin so user has to cross some portion before highlighting
        const heroBoundary = firstSection.offsetTop - 100; // 100px buffer
        if (window.scrollY < heroBoundary) {
          // Avoid redundant state updates
          if (active !== "") setActive("");
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(s.id);
            }
          });
        },
        { root: null, threshold: 0.4 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });
    return () => observersRef.current.forEach((o) => o.disconnect());
  }, []);

  // Clases condicionales para shrink + shadow
  const containerPadding = scrolled ? "py-4 md:py-6" : "py-8";
  const logoSize = scrolled
    ? "w-[90px] md:w-[110px]"
    : "w-[100px] md:w-[120px]";

  return (
    <div
      className={[
        "fixed top-0 left-0 w-full z-50",
        containerPadding,
        "transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]"
          : "bg-transparent",
      ].join(" ")}
      data-scrolled={scrolled ? "true" : "false"}
    >
      {/* Scroll progress bar */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
      <header className="flex items-center justify-between container">
        <Link href="/" aria-label="Ir al inicio">
          <Logo
            className={logoSize + " transition-[width] duration-300 ease-out"}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
          {sections.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={[
                  "relative px-1 py-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-foreground/50 hover:text-foreground",
                ].join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
                <span
                  className={[
                    "absolute left-0 -bottom-0.5 h-0.5 w-full rounded-full bg-primary/70 transition-all duration-300",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2 text-xs font-mono uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
          >
            Hablemos
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
