import type { NextConfig } from "next";

// Configuración para soportar export estático en GitHub Pages.
// Nota: Si alguna ruta usa renderizado dinámico (fetch en runtime, server actions, etc.) podría fallar el `next export`.
// Ajusta `output` o refactoriza esas páginas en caso necesario.
const isProd = process.env.NODE_ENV === "production";
const repoName = "medialityc-landing"; // Ajustar si cambia el nombre del repo.

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Export estático para GitHub Pages
  output: "export",
  // basePath y assetPrefix sólo en producción para que funcione en https://medialityc.github.io/medialityc-landing/
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
