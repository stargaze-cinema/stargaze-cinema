FROM node:18.1-alpine

WORKDIR /app

RUN apk -U add --no-cache git

COPY package*.json pnpm*.yaml tsconfig*.json ./

RUN corepack enable \
    && corepack prepare pnpm@7.0.0 --activate \
    && pnpm config set store-dir .pnpm-store \
    && pnpm i --frozen-lockfile \
    && pnpm rb esbuild

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start:production" ]
