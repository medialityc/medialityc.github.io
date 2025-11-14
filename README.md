# Archive

_Automatically synced with your [v0.app](https://v0.app) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shared-8867s-projects/v0-archive)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/7OBKdWwIbzR)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

### Sección de Servicios

Se añadió una nueva sección de servicios en `components/services.tsx` e integrada en la página principal (`app/page.tsx`).

Puedes ajustar el contenido modificando el arreglo `services` dentro del componente o pasar datos dinámicos posteriormente.

Características:

- Grid responsivo (2 columnas en sm, 3 en lg)
- Tarjetas interactivas con resalte radial según posición del cursor
- Íconos de `lucide-react`
- Accesible: cada tarjeta tiene `aria-label` con el título

Para editar estilos, ajusta las clases Tailwind dentro de `ServiceCard`.

## Deployment

Your project is live at:

**[https://vercel.com/shared-8867s-projects/v0-archive](https://vercel.com/shared-8867s-projects/v0-archive)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/7OBKdWwIbzR](https://v0.app/chat/projects/7OBKdWwIbzR)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Branding

La identidad de marca ahora utiliza el nuevo logotipo sin fondo (`public/brand/logo.svg`) y un sistema de variantes reutilizable a través del componente `BrandMark`.

### Uso del logotipo

- Componente principal: `Logo` (`components/logo.tsx`) para el wordmark corporativo en navegación y encabezados.
- Fondo Hero: ahora usa `BrandMark variant="watermark"` con movimiento sutil (`parallaxRatio`).
- Metadata (Favicon / Open Graph): referencia directa a `public/brand/logo.svg`.

### Variantes de `BrandMark`

| Variante    | Propósito                                      | Accesibilidad                       | Uso recomendado                        |
| ----------- | ---------------------------------------------- | ----------------------------------- | -------------------------------------- |
| `watermark` | Emblema grande tenue de fondo                  | aria-hidden                         | Hero, secciones con impacto visual     |
| `divider`   | Separador decorativo entre títulos y contenido | aria-hidden                         | Encabezados de bloques largos          |
| `inline`    | Emblema legible en línea (con `alt`)           | alt requerido                       | Próximo a texto que refuerza la marca  |
| `icon`      | Ícono compacto simplificado (SVG interno)      | aria-hidden                         | Botones secundarios, badges, chips     |
| `bullet`    | Marcador de listas con identidad               | aria-hidden + `sr-only` para número | Listas de beneficios / características |

Prop adicional: `parallaxRatio` (número). Aplica una transformación vertical basada en `scrollY` para dar vida al fondo. Valores sugeridos:

- Hero: `0.04 - 0.06`
- Sección secundaria: `0.015 - 0.025`
- Evitar valores > `0.08` para no distraer.

Ejemplo rápido:

```tsx
<BrandMark
  variant="watermark"
  parallaxRatio={0.05}
  className="absolute inset-0"
/>
```

### Patrones de integración

- Mantener opacidades bajas (`0.04 – 0.07`) para no competir con contenido.
- Para listas extensas (beneficios) usar `bullet` en lugar de íconos genéricos para reforzar identidad.
- Evitar saturación: máximo 1 watermark por viewport simultáneo.
- Combinar con gradientes suaves (`bg-linear-to-b`, `bg-radial`) para fusionar el emblema con el fondo.

### Accesibilidad

- `Logo`: incluye `<title>` y puede recibir `aria-label`.
- `BrandMark watermark / divider / icon / bullet`: decorativos → `aria-hidden` + `alt=""` implícito.
- `BrandMark inline`: debe llevar `alt` descriptivo.
- Para listas con `bullet`: añadir texto oculto (`sr-only`) si se requiere enumeración semántica.

### Recomendaciones

- Fondos oscuros: usar `text-white` o controlar color vía `currentColor`.
- Tamaños muy pequeños (< 36px): preferir `icon` en lugar de watermark/inline.
- Monocromático: aplicar utilidades Tailwind (`text-white`, `text-primary`, etc.).
- Parallax: desactivar (`parallaxRatio={0}`) si usuario tiene `prefers-reduced-motion` (opcional futura mejora).

### Próximos pasos sugeridos

- Variantes extra (invertido, outline) para fondos fotográficos.
- Paquete de assets (`png`, `svg`, `social-preview`) automatizado.
- Storybook: casos para cada variante + estado con y sin movimiento.
- Hook de motion preferencia para desactivar parallax según usuario.

### Metadata y Assets Social/Favicons

Se incorporaron metadatos SEO y social en `app/layout.tsx`:

- **Título / Descripción / Keywords** en español alineados con servicios de marketing, publicidad y software.
- **Open Graph & Twitter** apuntan a `public/brand/og-image.png` (placeholder 1200x630). Debe sustituirse por un PNG optimizado (<200KB, compresión `pngquant` o WebP fallback).
- **Favicons multi-tamaño** (placeholders):
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `apple-touch-icon.png` (180x180)
  - `android-chrome-192x192.png`
  - `android-chrome-512x512.png`

Estos archivos actualmente son placeholders de texto y necesitan reemplazo por imágenes reales. Recomendación de generación:

```bash
# macOS/Linux ejemplo de generación con sharp (Node)
npx sharp public/brand/logo.svg \
  -resize 512 512 \
  -background "#0C0F14" -flatten \
  public/android-chrome-512x512.png

npx sharp public/android-chrome-512x512.png -resize 192 192 public/android-chrome-192x192.png
npx sharp public/android-chrome-512x512.png -resize 180 180 public/apple-touch-icon.png
npx sharp public/android-chrome-512x512.png -resize 32 32 public/favicon-32x32.png
npx sharp public/android-chrome-512x512.png -resize 16 16 public/favicon-16x16.png
```

Para el **OG image**:

```bash
npx sharp public/brand/logo-horizontal.svg \
  -resize 800 0 \
  -extend 1200 630 -background "#0C0F14" -gravity center \
  public/brand/og-image.png
```

Validar con:

```bash
# Herramientas externas (manual)
# https://cards-dev.twitter.com/validator
# https://developers.facebook.com/tools/debug/
```

### Checklist de Optimización

- [ ] Reemplazar placeholders PNG por gráficos reales.
- [ ] Comprimir OG image (target <150KB).
- [ ] Verificar cuenta de Twitter `@medialityc`; ajustar si difiere.
- [ ] Agregar `robots.ts` y `sitemap.ts` ya presentes (no extender sitemap por petición actual).
- [ ] Añadir `prefers-reduced-motion` handling para animaciones opcional.

### Nota

No se modificó el sitemap más allá de la implementación base inicial, según tu indicación de omitir ampliaciones.
