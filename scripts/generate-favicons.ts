import fs from "fs";
import path from "path";
import sharp from "sharp";

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Rich Golden Gradients -->
    <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2B2" />
      <stop offset="25%" stop-color="#F5B301" />
      <stop offset="70%" stop-color="#C88E02" />
      <stop offset="100%" stop-color="#FFDE6A" />
    </linearGradient>

    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F5B301" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#F5B301" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#F5B301" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="lensShine" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background: Deep Obsidian with Rounded Corners -->
  <rect width="512" height="512" rx="112" fill="#0A0A0A" />
  
  <!-- Subtle Outer Gold Border -->
  <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="url(#goldLinear)" stroke-width="8" stroke-opacity="0.75" />

  <!-- Ambient Golden Center Glow -->
  <circle cx="256" cy="256" r="220" fill="url(#goldGlow)" />

  <!-- Outer Camera Lens Ring -->
  <circle cx="256" cy="256" r="185" fill="none" stroke="url(#goldLinear)" stroke-width="12" stroke-linecap="round" />
  
  <!-- Inner Fine Accent Ring -->
  <circle cx="256" cy="256" r="162" fill="none" stroke="url(#goldLinear)" stroke-width="3" stroke-opacity="0.5" stroke-dasharray="10 8" />

  <!-- Stylized Camera Shutter / Aperture Blades (8-fold symmetry) -->
  <g transform="translate(256, 256)" filter="url(#subtleGlow)">
    <!-- Blade 1 -->
    <path d="M 0,-150 L 50,-50 L -20,-40 Z" fill="url(#goldLinear)" opacity="0.9" />
    <!-- Blade 2 -->
    <path d="M 106,-106 L 70,0 L 0,-20 Z" fill="url(#goldLinear)" opacity="0.95" />
    <!-- Blade 3 -->
    <path d="M 150,0 L 50,50 L 40,-20 Z" fill="url(#goldLinear)" opacity="0.9" />
    <!-- Blade 4 -->
    <path d="M 106,106 L 0,70 L 20,0 Z" fill="url(#goldLinear)" opacity="0.95" />
    <!-- Blade 5 -->
    <path d="M 0,150 L -50,50 L 20,40 Z" fill="url(#goldLinear)" opacity="0.9" />
    <!-- Blade 6 -->
    <path d="M -106,106 L -70,0 L 0,20 Z" fill="url(#goldLinear)" opacity="0.95" />
    <!-- Blade 7 -->
    <path d="M -150,0 L -50,-50 L -40,20 Z" fill="url(#goldLinear)" opacity="0.9" />
    <!-- Blade 8 -->
    <path d="M -106,-106 L 0,-70 L -20,0 Z" fill="url(#goldLinear)" opacity="0.95" />

    <!-- Center Radiant 4-Point Golden Star (The Golden Light) -->
    <!-- Vertical Spire -->
    <path d="M 0,-115 Q 6,-25 35,0 Q 6,25 0,115 Q -6,25 -35,0 Q -6,-25 0,-115 Z" fill="url(#goldLinear)" />
    <!-- Diagonal Subtle Spire -->
    <path d="M 0,-65 Q 4,-15 20,0 Q 4,15 0,65 Q -4,15 -20,0 Q -4,-15 0,-65 Z" fill="#FFFFFF" opacity="0.85" transform="rotate(45)" />

    <!-- Inner Golden Core -->
    <circle cx="0" cy="0" r="18" fill="#FFF8D6" />
    <circle cx="0" cy="0" r="10" fill="#F5B301" />
  </g>
</svg>`;

async function run() {
  const publicDir = path.resolve(process.cwd(), "public");
  const svgPath = path.join(publicDir, "favicon.svg");
  fs.writeFileSync(svgPath, svgContent, "utf8");
  console.log("✓ Created public/favicon.svg");

  // Also create src/app/icon.svg for Next.js App Router default icon detection
  const appDir = path.resolve(process.cwd(), "src/app");
  fs.writeFileSync(path.join(appDir, "icon.svg"), svgContent, "utf8");
  console.log("✓ Created src/app/icon.svg");

  const svgBuffer = Buffer.from(svgContent);

  // 1. favicon-16x16.png
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, "favicon-16x16.png"));
  console.log("✓ Created public/favicon-16x16.png");

  // 2. favicon-32x32.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("✓ Created public/favicon-32x32.png");

  // 3. apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ Created public/apple-touch-icon.png");

  // 4. android-chrome-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "android-chrome-192x192.png"));
  console.log("✓ Created public/android-chrome-192x192.png");

  // 5. android-chrome-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "android-chrome-512x512.png"));
  console.log("✓ Created public/android-chrome-512x512.png");

  // 6. Generate multi-size favicon.ico from 32x32 png
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), png32);
  console.log("✓ Updated public/favicon.ico");

  console.log("🎉 All Favicons successfully generated!");
}

run().catch((e) => {
  console.error("Error generating favicons:", e);
  process.exit(1);
});
