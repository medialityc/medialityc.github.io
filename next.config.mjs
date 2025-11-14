/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "medialityc-landing";

// Duplicado en TS y MJS para evitar ambigüedad si el entorno prioriza uno u otro.
// Puedes eliminar este archivo y quedarte sólo con next.config.ts si prefieres.
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
