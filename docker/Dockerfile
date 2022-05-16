FROM node:18.1-alpine3.15 as development

WORKDIR /app

COPY package*.json pnpm*.yaml tsconfig*.json ./

RUN corepack enable \
    && corepack prepare pnpm@7.1.0 --activate \
    && pnpm i --frozen-lockfile \
    && pnpm rb esbuild

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start:development" ]

FROM development as build

RUN pnpm build

FROM nginx:1.21.6-alpine as production

COPY --from=build /app/dist /var/www/stargazecinema.com

COPY docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
