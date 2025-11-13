"use client";

import Link from "next/link";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { BrandMark } from "./brand-mark";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-between relative">
      {/* Decorative emblem with subtle parallax */}
      <BrandMark
        variant="watermark"
        parallaxRatio={0.045}
        className="absolute inset-0 flex items-center justify-center"
      />
      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">Ya cumplimos un año</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Desbloquea tu <br />
          <i className="font-light">máximo</i> crecimiento
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[640px] mx-auto">
          Transformamos tu visión en realidad digital con soluciones
          tecnológicas avanzadas y estrategias de marketing que impulsan
          resultados.
        </p>

        <Link className="contents max-sm:hidden" href="/#contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contactános]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/#contact">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contactános]
          </Button>
        </Link>
      </div>
    </div>
  );
}
