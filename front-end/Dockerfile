# Install dependencies only when needed
FROM node:alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS development
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN chown -R node:node /app/.next

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS production
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.babelrc ./
COPY --from=builder /app/i18n.js ./
COPY --from=builder /app/env.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

# CMD ["node_modules/.bin/next", "start"]
