import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
 * Local dev plugin that mounts api/*.js files as Vercel-compatible handlers.
 * Production deployment continues to use Vercel's serverless runtime; this
 * plugin only runs during `pnpm dev`.
 *
 * Each handler exports a default async function (req, res) where:
 *   - req.body is the parsed JSON body
 *   - res.status(n).json(obj) and res.status(n).end() work like Vercel/Express
 */
function vercelApiPlugin() {
  const apiDir = resolve(__dirname, 'api');

  function listEndpoints() {
    if (!existsSync(apiDir)) return [];
    return readdirSync(apiDir)
      .filter((f) => f.endsWith('.js') || f.endsWith('.mjs'))
      .map((f) => ({
        route: '/api/' + f.replace(/\.(m?js)$/, ''),
        file: resolve(apiDir, f),
      }));
  }

  async function readBody(req) {
    return new Promise((resolveBody, reject) => {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
      req.on('error', reject);
    });
  }

  function wrapResponse(res) {
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj));
      return res;
    };
    return res;
  }

  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      const endpoints = listEndpoints();
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split('?')[0];
        const ep = endpoints.find((e) => e.route === url);
        if (!ep) return next();
        try {
          const raw = await readBody(req);
          let body = {};
          if (raw && raw.length > 0) {
            try { body = JSON.parse(raw); } catch (e) { body = {}; }
          }
          req.body = body;
          /*
           * Bust the import cache by appending a query string. Without this,
           * edits to api/*.js wouldn't be picked up until the dev server
           * restarts.
           */
          const mod = await import(`${pathToFileURL(ep.file).href}?t=${Date.now()}`);
          const handler = mod.default || mod.handler;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.end(`api handler at ${ep.route} has no default export`);
            return;
          }
          await handler(req, wrapResponse(res));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message || 'api handler crashed' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  /*
   * loadEnv reads ALL keys from .env (no VITE_ prefix required) so we can
   * surface them to api/ handlers via process.env. We don't expose them to
   * the client - Vite still only inlines `import.meta.env.VITE_*` keys.
   */
  const env = loadEnv(mode, process.cwd(), '');
  for (const [k, v] of Object.entries(env)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      vercelApiPlugin(),
    ],
  };
});
