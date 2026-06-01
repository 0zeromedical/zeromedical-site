import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function resolveAsset(pathname) {
  const requested = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(root, requested);
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  return join(root, "index.html");
}

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  const filePath = resolveAsset(url.pathname);
  response.setHeader("Content-Type", mimeTypes[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`ZERO MEDICAL preview running at http://localhost:${port}`);
});
