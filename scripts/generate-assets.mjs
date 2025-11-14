import sharp from "sharp";
import path from "path";
import { existsSync } from "fs";

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const outDir = path.join(root, "public");

const logo = path.join(brandDir, "logo.svg");
const logoHorizontal = path.join(brandDir, "logo-horizontal.svg");

if (!existsSync(logo) || !existsSync(logoHorizontal)) {
  console.error("Missing logo SVG files in public/brand.");
  process.exit(1);
}

async function run() {
  console.log("Generating PNG assets...");
  const bg = { r: 12, g: 15, b: 20, alpha: 1 };

  // Base 512x512
  const base512 = path.join(outDir, "android-chrome-512x512.png");
  await sharp(logo)
    .resize(512, 512, { fit: "contain", background: bg })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(base512);

  const sizes = [
    { file: "android-chrome-192x192.png", w: 192, h: 192 },
    { file: "apple-touch-icon.png", w: 180, h: 180 },
    { file: "favicon-32x32.png", w: 32, h: 32 },
    { file: "favicon-16x16.png", w: 16, h: 16 },
  ];
  for (const s of sizes) {
    await sharp(base512)
      .resize(s.w, s.h)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(path.join(outDir, s.file));
    console.log("Created", s.file);
  }

  // OG image 1200x630
  const ogOut = path.join(brandDir, "og-image.png");
  const logoBuf = await sharp(logoHorizontal)
    .resize(800)
    .png({ quality: 95 })
    .toBuffer();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: logoBuf, gravity: "center" }])
    .png({ quality: 90 })
    .toFile(ogOut);
  console.log("Created og-image.png");
  console.log("All assets generated successfully.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
