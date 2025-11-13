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
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-1 " role="list">
          {featuredProjects.map((p, i) => (
            <AnimatedReveal
              key={p.id}
              delay={0.1 + i * 0.07}
              distance={40}
              className="flex"
            >
              <ProjectItem meta={p} index={i} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ meta, index }: { meta: ProjectMeta; index: number }) {
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
        </span>
      </div>
    </div>
  );
}
