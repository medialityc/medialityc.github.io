"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Leader {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  initials?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

// TODO: Reemplazar imageUrl con rutas reales en /public/team/*.jpg
const leaders: Leader[] = [
  {
    name: "Carlos Mendoza",
    role: "CEO & Fundador",
    bio: "Visionario y estratega con más de 10 años liderando proyectos digitales.",
    initials: "CM",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "María González",
    role: "Directora de Operaciones",
    bio: "Experta en procesos y excelencia operacional. Convierte ideas en resultados.",
    initials: "MG",
    socials: { linkedin: "#" },
  },
  {
    name: "Roberto Silva",
    role: "CTO",
    bio: "Arquitecto de software y amante de la innovación. Escala tecnología con propósito.",
    initials: "RS",
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Laura Pérez",
    role: "Directora de Marketing",
    bio: "Data-driven y creativa. Diseña estrategias que conectan marcas con personas.",
    initials: "LP",
    socials: { linkedin: "#", twitter: "#" },
  },
];

export const TeamSection = () => {
  const fallbackImg = "/team/fallback-avatar.svg";
  return (
    <section id="equipo" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container relative">
        <div className="flex flex-col items-start gap-6 md:gap-8 max-w-3xl">
          <span className="text-primary font-mono text-xs uppercase tracking-wider">
            Nuestro equipo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Liderazgo y dirección
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Conoce a las personas que impulsan nuestra visión y lideran cada
            proyecto con excelencia.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <Card
              key={leader.name}
              className="group h-full border-border/60 bg-background/70 backdrop-blur-sm transition-colors hover:border-primary/40 hover:shadow-[0_4px_18px_-4px_hsl(var(--primary)/0.35)]"
            >
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="size-14 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage
                    src={leader.imageUrl || fallbackImg}
                    alt={`Foto de ${leader.name}`}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.fallbackApplied) {
                        target.src = fallbackImg;
                        target.dataset.fallbackApplied = "true";
                      }
                    }}
                  />
                  <AvatarFallback className="text-xs font-medium">
                    {leader.initials ??
                      leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-base md:text-lg font-semibold leading-tight">
                    {leader.name}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    {leader.role}
                  </CardDescription>
                </div>
              </CardHeader>
              {leader.bio && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
                    {leader.bio}
                  </p>
                </CardContent>
              )}
              {leader.socials && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs">
                    {leader.socials.linkedin && (
                      <SocialLink href={leader.socials.linkedin}>
                        LinkedIn
                      </SocialLink>
                    )}
                    {leader.socials.twitter && (
                      <SocialLink href={leader.socials.twitter}>
                        Twitter
                      </SocialLink>
                    )}
                    {leader.socials.github && (
                      <SocialLink href={leader.socials.github}>
                        GitHub
                      </SocialLink>
                    )}
                    {leader.socials.website && (
                      <SocialLink href={leader.socials.website}>
                        Sitio web
                      </SocialLink>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1",
        "text-foreground/70 border-foreground/10 hover:text-primary hover:border-primary/40 transition-colors"
      )}
    >
      {children}
      <span aria-hidden className="inline-block">
        →
      </span>
    </Link>
  );
}
