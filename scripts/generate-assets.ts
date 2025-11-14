import sharp from "sharp";
import path from "path";
import { existsSync, mkdirSync } from "fs";

/*
  Script: generate-assets.ts
  Purpose: Produce production-ready PNG assets from existing SVG logos.
  Usage (pwsh):
    pnpm ts-node scripts/generate-assets.ts

  Requires: ts-node (or compile first) and sharp dependency.
*/

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const outDir = path.join(root, "public");

const logo = path.join(brandDir, "logo.svg");
const logoHorizontal = path.join(brandDir, "logo-horizontal.svg");

if (!existsSync(logo) || !existsSync(logoHorizontal)) {
  console.error("Missing logo SVG files in public/brand.");
  process.exit(1);
}

async function main() {
  console.log("Generating favicon & social images...");

  // Base large square from logo
  const largePng = path.join(outDir, "android-chrome-512x512.png");
  await sharp(logo)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 12, g: 15, b: 20, alpha: 1 },
    })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(largePng);

  // Derivatives
  const sizes = [
    { file: "android-chrome-192x192.png", w: 192, h: 192 },
    { file: "apple-touch-icon.png", w: 180, h: 180 },
    { file: "favicon-32x32.png", w: 32, h: 32 },
    { file: "favicon-16x16.png", w: 16, h: 16 },
  ];
  for (const s of sizes) {
    await sharp(largePng)
      .resize(s.w, s.h)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(path.join(outDir, s.file));
    console.log("Created", s.file);
  }

  // OG Image 1200x630 from horizontal logo
  const og = path.join(brandDir, "og-image.png");
  const bgColor = { r: 12, g: 15, b: 20, alpha: 1 };
  const canvasW = 1200;
  const canvasH = 630;

  // Render horizontal logo with max width and some padding
  const renderedLogo = await sharp(logoHorizontal)
    .resize(800) // width 800 keep aspect
    .png({ quality: 95 })
    .toBuffer();

  // Composite onto background canvas centered
  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: bgColor,
    },
  })
    .composite([{ input: renderedLogo, gravity: "center" }])
    .png({ quality: 90 })
    .toFile(og);
  console.log("Created og-image.png");

  console.log("All assets generated successfully.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
