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

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const entry of entries) {
  cpSync(entry, join(outputDir, entry), { recursive: true });
}

console.log(`Prepared ${outputDir} output directory.`);
