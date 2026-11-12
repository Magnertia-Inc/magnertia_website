# Deploying Magnertia to Railway

The site runs as **two Railway services from this one repo**:

| Service | Root directory | Config file | Public? | What it is |
|---|---|---|---|---|
| `web` | `/` | `/railway.json` | Yes, custom domain | TanStack Start SSR site (Dockerfile in repo root) |
| `api` | `/server` | `/server/railway.json` | **No** (private network only) | Express + MongoDB API (`server/Dockerfile`) |

The browser only talks to `web`. Every request to `/api/*` is forwarded by `web` to `api`
over Railway's private network (see `src/server.ts`), so there is one domain and no CORS setup.

## 1. MongoDB Atlas

1. **Rotate the database user's password.** The old connection string was committed to this
   public repo and must be treated as leaked.
2. Network Access → add `0.0.0.0/0` (Railway has no fixed outbound IP).
3. Copy the new connection string (`mongodb+srv://...`). Only paste it into Railway Variables.

## 2. Create the Railway project

1. New Project → Deploy from GitHub repo → `Magnertia-Inc/magnertia_website`.
2. That first service is **web**. Settings: Root Directory `/`, Config-as-code path `/railway.json`.
3. Add a second service from the same repo and name it **api**. Settings: Root Directory `/server`,
   Config-as-code path `/server/railway.json`. Do **not** generate a public domain for it.
4. Set both services' branch to the branch you deploy from.

## 3. Variables

**api**

| Variable | Value |
|---|---|
| `MONGODB_URI` | new Atlas connection string |
| `PORT` | `4000` |
| `NODE_ENV` | `production` |
| `ADMIN_EMAIL` | admin login email |
| `ADMIN_PASSWORD` | strong admin password |
| `AUTH_SECRET` | 64 random hex chars: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CORS_ORIGIN` | `https://www.magnertia.in` (not strictly needed — same-origin) |

**web**

| Variable | Value |
|---|---|
| `API_URL` | `http://${{api.RAILWAY_PRIVATE_DOMAIN}}:4000` |
| `NODE_ENV` | `production` |

## 4. Check before adding the domain

Open the `web` service's generated `*.up.railway.app` URL:

- All pages load.
- `/api/health` returns `{"status":"ok"}`.
- `/api/inquiries` returns `401 Unauthorized` (customer data is not public).
- Submit a test enquiry and a contact message → log in at `/login` → both appear and show "MongoDB Connected".

## 5. Custom domain (GoDaddy)

In Railway → `web` → Settings → Networking → Custom Domain, add `www.magnertia.in`.
Railway shows a **CNAME** target and a **TXT** verification record. Add both in GoDaddy DNS.

GoDaddy can't CNAME the bare domain (`magnertia.in`), so pick one:

- **Option A (recommended): move DNS to Cloudflare** (free). Change GoDaddy nameservers to
  Cloudflare's, then add both `magnertia.in` and `www.magnertia.in` in Railway and create the
  CNAME/TXT records in Cloudflare with the proxy (orange cloud) **off**.
- **Option B: stay on GoDaddy.** Add only `www.magnertia.in` in Railway, and use GoDaddy
  Domain → Forwarding to send `magnertia.in` → `https://www.magnertia.in` (301, permanent).

Railway issues the HTTPS certificate automatically once DNS resolves (usually minutes, up to a few hours).

## Local development

```bash
npm install
npm run setup:server
cp server/.env.example server/.env   # fill in values
npm run dev                          # Vite on :5173 + API on :4000
```
