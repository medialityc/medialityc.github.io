"use client";

import LaptopComponente from "@/components/gl/laptop-componente";
import { AnimatedReveal } from "@/components/animated-reveal";
import { BrandMark } from "@/components/brand-mark";
import React, { useEffect, useState } from "react";

interface ProjectMeta {
  id: string;
  name: string;
  summary: string;
  url: string; // URL de despliegue para iframe
  screenshot?: string; // opcional si luego se usa captura
}

// Placeholder: el contenido real lo agregará el usuario
const featuredProjects: ProjectMeta[] = [
  {
    id: "dconceptos",
    name: "Dconceptos",
    summary: "Tienda en linea de diseño de interiores y exteriores.",
    url: "https://dconceptos.com/",
  },
  {
    id: "wonderfitcuba",
    name: "Wonder Fit Cuba",
    summary: "Tienda en línea para equipos y accesorios de fitness.",
    url: "https://wonderfitcuba.com/",
  },
  {
    id: "zasbyjmc",
    name: "Zas By JMC",
    summary: "Sistema administrativo para agencia de paquetería",
    url: "https://zasbyjmc.com/",
  },
  {
    id: "suntravelsonline",
    name: "Sun Travels Online",
    summary: "Agencia de viajes especializada en destinos soleados.",
    url: "https://www.suntravelsonline.com/",
  },
];

export function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const total = featuredProjects.length;
  const next = () => setCurrent((c) => (c + 1) % total);
  const nextName = featuredProjects[(current + 1) % total]?.name ?? "Siguiente";
  return (
    <section id="proyectos" className="py-28 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-primary/5 to-background" />
      <div className="container relative">
        <AnimatedReveal className="max-w-3xl mb-14 space-y-6" distance={44}>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Proyectos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Casos Destacados
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Una selección de trabajos relevantes que muestran nuestro enfoque en
            producto, detalle y rendimiento.
          </p>
        </AnimatedReveal>
        <BrandMark variant="divider" />
        <AnimatedReveal delay={0.1} distance={40} className="flex">
          <ProjectItem
            meta={featuredProjects[current]}
            index={current}
            onNext={next}
            nextName={nextName}
            total={total}
          />
        </AnimatedReveal>
      </div>
    </section>
  );
}

function ProjectItem({
  meta,
  index,
  onNext,
  nextName,
  total,
}: {
  meta: ProjectMeta;
  index: number;
  onNext: () => void;
  nextName: string;
  total: number;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640); // breakpoint sm
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Responsive sizes: smaller physical screen for mobile but keep desktop viewport to force desktop layout inside iframe
  const screenWidth = isMobile ? 320 : 340;
  const screenHeight = isMobile ? 200 : 215;
  const scale = isMobile ? 1.08 : 1.22;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="relative w-full mx-auto aspect-4/3 lg:max-w-full sm:max-w-[460px]">
        <LaptopComponente
          scale={scale}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          viewportWidth={1280}
          viewportHeight={800}
        >
          <iframe
            src={meta.url}
            title={meta.name}
            className="absolute inset-0 w-full h-full bg-black"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </LaptopComponente>
        {/* Botón flotante al lado de la laptop (derecha). En mobile, se muestra en la esquina inferior derecha. */}
        <button
          type="button"
          onClick={onNext}
          className="group absolute z-10 right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/30 ring-1 ring-white/20 bg-linear-to-r from-primary/80 via-primary to-pink-500 backdrop-blur transition-all hover:scale-105 hover:brightness-110"
          aria-label={`Siguiente proyecto: ${nextName}`}
        >
          <span className="mr-2">Siguiente:</span>
          <span className="truncate max-w-[140px]">{nextName}</span>
          <svg
            className="ml-2 size-3.5 opacity-90 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h12M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="group absolute z-10 bottom-2 right-2 sm:hidden inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-primary/30 ring-1 ring-white/20 bg-linear-to-r from-primary via-primary to-pink-500 backdrop-blur transition-all hover:scale-105"
          aria-label={`Siguiente proyecto: ${nextName}`}
        >
          <span className="mr-1.5">Siguiente</span>
          <svg
            className="size-3 opacity-90 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h12M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-base font-semibold tracking-tight">{meta.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          {meta.summary}
        </p>
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
          aria-label={`Visitar sitio de ${meta.name}`}
        >
          Visitar sitio ↗
        </a>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-primary/70">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
          <span className="ml-1 opacity-70">/ {total}</span>
        </span>
      </div>
    </div>
  );
}
