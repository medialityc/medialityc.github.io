"use client";

import { BenefitsSection } from "@/components/benefits";
import { ContactSection } from "@/components/contact";
import { GL } from "@/components/gl";
import GLNodes from "@/components/gl/nodes-network";
import { Hero } from "@/components/hero";
import { TeamSection } from "@/components/team";
import { ProjectsSection } from "@/components/projects";
import { ServicesSection } from "@/components/services";
import { TestimonialsSection } from "@/components/testimonials";
import { Leva } from "leva";
import LaptopComponente from "@/components/gl/laptop-componente";

export default function Home() {
  return (
    <>
      <GL />
      {/* Componente 3D opcional: <LaptopComponente /> */}
      {/* <GLNodes /> */}
      <Hero />
      <ServicesSection />
      <BenefitsSection />
  <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
  {/* Instancia aislada del laptop eliminada para evitar render duplicado. */}
      <Leva hidden />
    </>
  );
}
