import { readFileSync, statSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "app.js",
  "admin.js",
  "styles.css",
  "vercel.json",
  "robots.txt",
  "sitemap.xml"
];

const requiredRoutes = [
  "/",
  "/import",
  "/products",
  "/cosmetic",
  "/marketing",
  "/space",
  "/about",
  "/contact",
  "/admin"
];

for (const file of requiredFiles) {
  const info = statSync(file);
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Missing or empty required file: ${file}`);
  }
}

const app = readFileSync("app.js", "utf8");
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");

for (const route of requiredRoutes) {
  if (!app.includes(`"${route}"`)) {
    throw new Error(`Route is not registered in app.js: ${route}`);
  }
}

for (const token of ["/styles.css", "/app.js", "/admin.js", "/assets/hero-clinic.png"]) {
  if (!html.includes(token)) {
    throw new Error(`index.html does not reference ${token}`);
  }
}

const adminJs = readFileSync("admin.js", "utf8");

const assetRefs = new Set();
for (const source of [app, adminJs, html, css]) {
  for (const match of source.matchAll(/["'(](\/assets\/[^"')\s]+)/g)) {
    assetRefs.add(match[1].replace(/^\//, ""));
  }
}

if (assetRefs.size === 0) {
  throw new Error("No asset references found.");
}

for (const asset of assetRefs) {
  const info = statSync(asset);
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Missing or empty referenced asset: ${asset}`);
  }
}

const sitemap = readFileSync("sitemap.xml", "utf8");
const removedLocalePrefix = `/${"k"}${"r"}`;
if (sitemap.includes(removedLocalePrefix)) {
  throw new Error("sitemap.xml still contains Korean page routes.");
}

const vercel = readFileSync("vercel.json", "utf8");
if (vercel.includes(removedLocalePrefix)) {
  throw new Error("vercel.json still contains Korean page routes.");
}

console.log(`Validated ${requiredFiles.length} core files, ${assetRefs.size} assets, and ${requiredRoutes.length} routes.`);
