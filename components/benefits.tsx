"use client";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { AnimatedReveal } from "@/components/animated-reveal";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Equipo experto con años de experiencia en tecnología y marketing",
  "Metodologías ágiles para entregas rápidas y eficientes",
  "Soporte continuo y mantenimiento post-lanzamiento",
  "Soluciones escalables que crecen con tu negocio",
  "Enfoque en ROI y resultados medibles",
  "Comunicación transparente en cada etapa del proyecto",
];

export function BenefitsSection() {
  // Mouse glow for list area
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  return (
    <section
      id="beneficios"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-radial from-primary/15 via-primary/0 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(120deg,hsl(var(--primary)/0.25)_0%,transparent_55%)] mix-blend-overlay" />
      </div>
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <AnimatedReveal className="space-y-7" delay={0} distance={46}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1.5 text-xs font-mono tracking-wider uppercase text-primary/80 bg-primary/10 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Ventajas Clave
            </div>
            <h2
              id="benefits-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance"
            >
              ¿Por Qué Elegir
              <span className="relative inline-block mx-2">
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent font-extrabold">
                  Medialityc
                </span>
                <span className="absolute -inset-1 rounded-xl opacity-20 blur-md bg-radial from-primary/60 via-primary/30 to-transparent" />
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-prose">
              Somos tu socio estratégico en transformación digital. Combinamos
              experiencia técnica con creatividad para entregar soluciones que
              realmente impulsan tu negocio.
            </p>
            <Button
              asChild
              className="group mt-6 border-primary/50 text-primary hover:bg-primary/10 transition-colors"
            >
              <a href="#contacto" className="inline-flex items-center gap-2">
                Empezar Ahora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </AnimatedReveal>
          <div
            className="relative group rounded-xl p-2 md:p-4 before:absolute before:inset-0 before:rounded-xl before:border before:border-primary/20 before:pointer-events-none"
            onMouseMove={handleMove}
            style={{
              background: reduceMotion
                ? "hsl(var(--background)/0.6)"
                : `radial-gradient(circle at ${pos.x}px ${pos.y}px, hsl(var(--primary)/0.18), transparent 60%)`,
              transition: "background 0.25s",
            }}
          >
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <AnimatedReveal
                  key={index}
                  className="group/item rounded-lg px-3 py-2 md:px-4 md:py-3 transition-all duration-500 hover:bg-primary/10 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5"
                  delay={0.12 + index * 0.07}
                  distance={34}
                >
                  <li className="flex items-start gap-4 w-full">
                    <div className="relative">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5 transition-transform group-hover/item:scale-110" />
                      <span className="absolute -top-2 -right-2 text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.5 rounded">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed flex-1">
                      {benefit}
                    </p>
                  </li>
                </AnimatedReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
