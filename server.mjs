import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { getCatalog, getManual } from "./data/manuals.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");

async function loadEnv() {
  try {
    const source = await readFile(join(root, ".env"), "utf8");
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator < 1) continue;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await loadEnv();

const port = Number(process.env.PORT || 4173);
const username = process.env.PORTAL_USERNAME;
const password = process.env.PORTAL_PASSWORD;
const sessionHours = Math.min(Math.max(Number(process.env.SESSION_HOURS || 8), 1), 72);
const sessionTtl = sessionHours * 60 * 60 * 1000;

if (!username || !password) {
  console.error("Missing PORTAL_USERNAME or PORTAL_PASSWORD. Create a .env file from .env.example.");
  process.exit(1);
}

const sessions = new Map();
const loginAttempts = new Map();
const expectedUsername = createHash("sha256").update(username).digest();
const expectedPassword = createHash("sha256").update(password).digest();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
  );
}

function sendJson(response, status, payload, extraHeaders = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  response.end(JSON.stringify(payload));
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)])
  );
}

function sessionCookie(token, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `inv_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSeconds}${secure}`;
}

function getSession(request) {
  const token = parseCookies(request.headers.cookie).inv_session;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + sessionTtl;
  return { token, session };
}

function clientAddress(request) {
  return request.socket.remoteAddress || "unknown";
}

function attemptState(address) {
  let state = loginAttempts.get(address);
  if (!state) {
    state = { failures: 0, blockedUntil: 0 };
    loginAttempts.set(address, state);
  }
  if (state.blockedUntil && state.blockedUntil <= Date.now()) {
    state.failures = 0;
    state.blockedUntil = 0;
  }
  return state;
}

function safeEqual(received, expected) {
  const receivedHash = createHash("sha256").update(received).digest();
  return timingSafeEqual(receivedHash, expected);
}

async function readJson(request) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > 16_384) throw new Error("PAYLOAD_TOO_LARGE");
    chunks.push(chunk);
  }
  if (!length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function clientIdentity() {
  return {
    username,
    displayName: username === "admin" ? "Portal Admin" : username,
    role: "Manual access"
  };
}

async function handleLogin(request, response) {
  const address = clientAddress(request);
  const state = attemptState(address);
  if (state.blockedUntil > Date.now()) {
    const retryAfter = Math.ceil((state.blockedUntil - Date.now()) / 1000);
    response.setHeader("Retry-After", String(retryAfter));
    return sendJson(response, 429, {
      error: "TOO_MANY_ATTEMPTS",
      message: `登录尝试过多，请在 ${Math.ceil(retryAfter / 60)} 分钟后重试。`
    });
  }

  let body;
  try {
    body = await readJson(request);
  } catch (error) {
    const status = error.message === "PAYLOAD_TOO_LARGE" ? 413 : 400;
    return sendJson(response, status, { error: "INVALID_REQUEST", message: "登录请求无效。" });
  }

  const suppliedUser = typeof body.username === "string" ? body.username.trim() : "";
  const suppliedPassword = typeof body.password === "string" ? body.password : "";

  if (!safeEqual(suppliedUser, expectedUsername) || !safeEqual(suppliedPassword, expectedPassword)) {
    state.failures += 1;
    if (state.failures >= 5) state.blockedUntil = Date.now() + 5 * 60 * 1000;
    return sendJson(response, 401, {
      error: "INVALID_CREDENTIALS",
      message: "账号或密码不正确，请重新输入。"
    });
  }

  loginAttempts.delete(address);
  const token = randomBytes(32).toString("hex");
  sessions.set(token, { username, expiresAt: Date.now() + sessionTtl });
  response.setHeader("Set-Cookie", sessionCookie(token, Math.floor(sessionTtl / 1000)));
  return sendJson(response, 200, { authenticated: true, user: clientIdentity() });
}

function renderDownload(manual) {
  const escape = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const sections = manual.sections
    .map(
      (section) => `
        <section>
          <h2>${escape(section.title)}</h2>
          ${section.body.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}
        </section>`
    )
    .join("");

  return `<!doctype html>
<html lang="${escape(manual.language.locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(manual.title)}</title>
  <style>
    body{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17202a;line-height:1.65;margin:0;background:#f3f5f4}
    main{background:#fff;max-width:820px;margin:32px auto;padding:56px;box-shadow:0 8px 32px #142c241a}
    .eyebrow{color:#17815c;text-transform:uppercase;letter-spacing:.14em;font-weight:700;font-size:12px}
    h1{font-size:34px;line-height:1.18;margin:12px 0}
    .meta{border-top:1px solid #dbe3df;border-bottom:1px solid #dbe3df;padding:14px 0;margin:28px 0;color:#5d6c65}
    h2{font-size:20px;margin:32px 0 10px;color:#17392d}
    .notice{background:#edf8f3;border-left:4px solid #20a678;padding:14px 18px;margin-top:36px;color:#315449}
    @media print{body{background:#fff} main{box-shadow:none;margin:0;padding:24px} @page{margin:18mm}}
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">DEMO MANUAL · ${escape(manual.language.label)}</div>
    <h1>${escape(manual.title)}</h1>
    <div class="meta">${escape(manual.series)} · v${escape(manual.version)} · ${escape(manual.rating)} · ${escape(manual.updated)}</div>
    ${sections}
    <div class="notice">Demo content. Replace this manual with approved product documentation before operational use.</div>
  </main>
</body>
</html>`;
}

async function serveStatic(requestPath, response) {
  const normalizedPath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = normalizedPath === "/" ? "index.html" : normalizedPath.replace(/^[/\\]+/, "");
  const allowed = /\.(css|html|ico|js|png|svg|webp)$/i.test(relativePath);
  if (!allowed) {
    response.writeHead(404);
    return response.end("Not found");
  }
  const fullPath = join(publicDir, relativePath);
  if (!fullPath.startsWith(publicDir)) {
    response.writeHead(403);
    return response.end("Forbidden");
  }
  try {
    const content = await readFile(fullPath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(fullPath)] || "application/octet-stream",
      "Cache-Control": relativePath === "index.html" ? "no-cache" : "public, max-age=3600"
    });
    response.end(content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500);
    response.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
}

const server = createServer(async (request, response) => {
  setSecurityHeaders(response);
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const path = url.pathname;

  try {
    if (path === "/api/health" && request.method === "GET") {
      return sendJson(response, 200, { status: "ok" });
    }

    if (path === "/api/session" && request.method === "GET") {
      const active = getSession(request);
      return sendJson(response, 200, {
        authenticated: Boolean(active),
        user: active ? clientIdentity() : null
      });
    }

    if (path === "/api/login" && request.method === "POST") {
      return await handleLogin(request, response);
    }

    if (path === "/api/logout" && request.method === "POST") {
      const active = getSession(request);
      if (active) sessions.delete(active.token);
      response.setHeader("Set-Cookie", "inv_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0");
      return sendJson(response, 200, { authenticated: false });
    }

    if (path === "/api/catalog" && request.method === "GET") {
      if (!getSession(request)) {
        return sendJson(response, 401, { error: "UNAUTHENTICATED", message: "请先登录。" });
      }
      return sendJson(response, 200, { products: getCatalog(), generatedAt: new Date().toISOString() });
    }

    const manualMatch = path.match(/^\/api\/manuals\/([a-z0-9-]+)\/(zh|en|de|fr|es|pt)$/);
    if (manualMatch && request.method === "GET") {
      if (!getSession(request)) {
        return sendJson(response, 401, { error: "UNAUTHENTICATED", message: "请先登录。" });
      }
      const manual = getManual(manualMatch[1], manualMatch[2]);
      return manual
        ? sendJson(response, 200, { manual })
        : sendJson(response, 404, { error: "NOT_FOUND", message: "未找到该语言版本的说明书。" });
    }

    const downloadMatch = path.match(/^\/api\/manuals\/([a-z0-9-]+)\/(zh|en|de|fr|es|pt)\/download$/);
    if (downloadMatch && request.method === "GET") {
      if (!getSession(request)) {
        return sendJson(response, 401, { error: "UNAUTHENTICATED", message: "请先登录。" });
      }
      const manual = getManual(downloadMatch[1], downloadMatch[2]);
      if (!manual) {
        return sendJson(response, 404, { error: "NOT_FOUND", message: "未找到该语言版本的说明书。" });
      }
      const filename = `${manual.id}-${manual.language.code}-v${manual.version}.html`;
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store"
      });
      return response.end(renderDownload(manual));
    }

    if (path.startsWith("/api/")) {
      return sendJson(response, 404, { error: "NOT_FOUND", message: "接口不存在。" });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      return response.end("Method not allowed");
    }

    return await serveStatic(path, response);
  } catch (error) {
    console.error(error);
    if (!response.headersSent) sendJson(response, 500, { error: "SERVER_ERROR", message: "服务器发生错误。" });
    else response.end();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Inverter manual portal: http://localhost:${port}`);
  console.log(`Sessions expire after ${sessionHours} hours.`);
});
