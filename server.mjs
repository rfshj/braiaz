import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { port } from "./server-config.mjs";

const publicRoot = resolve(fileURLToPath(new URL(".", import.meta.url)));
const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
    response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src https://geodashlite.pages.dev https://skate.aaddpp.lol; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    } catch {
        response.writeHead(400).end("Bad request");
        return;
    }

    let filePath = resolve(publicRoot, `.${pathname}`);
    if (filePath !== publicRoot && !filePath.startsWith(`${publicRoot}${sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
    }

    try {
        if ((await stat(filePath)).isDirectory()) {
            filePath = resolve(filePath, "index.html");
        }
        const contents = await readFile(filePath);
        response.writeHead(200, {
            "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
            "Content-Length": contents.length,
        });
        response.end(request.method === "HEAD" ? undefined : contents);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    }
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Plocky is serving on port ${port}`);
});