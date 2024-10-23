# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
RUN apk add --no-cache libc6-compat git

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# --- Production Dependencies ---
FROM deps as prod-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

# --- Builder ---
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Production ---
FROM base

WORKDIR /app

ENV NODE_ENV="production"
ENV PORT="3000"

RUN apk add --no-cache curl
RUN addgroup nodejs
RUN adduser -SDH remix

COPY --from=prod-deps --chown=remix:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=remix:nodejs /app/build /app/build
COPY --from=builder --chown=remix:nodejs /app/public /app/public
COPY --from=builder --chown=remix:nodejs /app/package.json /app/package.json

USER remix

EXPOSE 3000

CMD ["npm", "start"]