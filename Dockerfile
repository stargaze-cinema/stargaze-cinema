FROM node:18.0-alpine

USER root
WORKDIR /app

RUN apk -U add --no-cache git
COPY package*.json pnpm*.yaml tsconfig*.json ./
RUN corepack enable \
    && corepack prepare pnpm@7.0.0-rc.8 --activate \
    && pnpm config set store-dir .pnpm-store \
    && pnpm i --frozen-lockfile \
    && pnpm rb esbuild
EXPOSE 3000
