// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import http from "node:http";

/**
 * Custom API proxy middleware plugin that forwards /api/* requests to the Express backend (http://127.0.0.1:4000).
 * If the Express backend is offline, it cleanly handles ECONNREFUSED without dumping noisy proxy stack traces into Vite logs.
 */
function apiProxyPlugin() {
  return {
    name: "api-proxy-plugin",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url?.startsWith("/api")) {
          return next();
        }

        const options: http.RequestOptions = {
          hostname: "127.0.0.1",
          port: 4000,
          path: req.url,
          method: req.method,
          headers: {
            ...req.headers,
            host: "127.0.0.1:4000",
          },
        };

        const proxyReq = http.request(options, (proxyRes) => {
          res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });

        proxyReq.on("error", (err: any) => {
          if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
            // Express server is offline — respond cleanly without logging noise to Vite terminal
            if (!res.headersSent) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  data: [],
                  connected: false,
                  message: "Express backend is offline. Local storage fallback active.",
                })
              );
            }
          } else {
            if (!res.headersSent) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          }
        });

        if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
          req.pipe(proxyReq, { end: true });
        } else {
          proxyReq.end();
        }
      });
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    base: "./",
    plugins: [apiProxyPlugin()],
  },
});
