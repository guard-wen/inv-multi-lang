import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const publicDirectory = fileURLToPath(new URL("./public/", import.meta.url));
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://localhost");
    const relativePath = decodeURIComponent(url.pathname)
      .replace(/^\/+/, "")
      .replace(/\/$/, "/index.html");
    const safePath = normalize(relativePath || "index.html");
    const filePath = join(publicDirectory, safePath);

    if (!filePath.startsWith(publicDirectory)) {
      response.writeHead(403);
      return response.end("Forbidden");
    }

    const info = await stat(filePath);
    if (!info.isFile()) throw Object.assign(new Error("Not a file"), { code: "ENOENT" });
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500);
    response.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Manual page: http://localhost:${port}`);
});
