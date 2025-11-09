"use client";

import { BenefitsSection } from "@/components/benefits";
import { ContactSection } from "@/components/contact";
import { GL } from "@/components/gl";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services";
import { TestimonialsSection } from "@/components/testimonials";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <GL />
      <Hero />
      <ServicesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ContactSection />
      <Leva hidden />
    </>
  );
}
