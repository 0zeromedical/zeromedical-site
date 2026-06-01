import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const outputDir = "public";
const entries = [
  "index.html",
  "app.js",
  "styles.css",
  "robots.txt",
  "sitemap.xml",
  "assets"
];

const staticRoutes = [
  "import",
  "products",
  "cosmetic",
  "marketing",
  "space",
  "about",
  "contact"
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const entry of entries) {
  cpSync(entry, join(outputDir, entry), { recursive: true });
}

for (const route of staticRoutes) {
  mkdirSync(join(outputDir, route), { recursive: true });
  cpSync("index.html", join(outputDir, `${route}.html`));
  cpSync("index.html", join(outputDir, route, "index.html"));
}

console.log(`Prepared ${outputDir} output directory.`);
