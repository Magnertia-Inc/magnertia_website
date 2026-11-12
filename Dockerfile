# Magnertia website (TanStack Start SSR) — Railway "web" service
FROM node:22-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# Build a standalone Node server (default Lovable target is Cloudflare)
ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
