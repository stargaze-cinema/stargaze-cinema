FROM node:18.0-alpine

USER root
WORKDIR /app

COPY package*.json tsconfig*.json ./
RUN npm install -g npm@latest \
    && npm ci \
    && npm rebuild esbuild \
    && npm cache clean --force

EXPOSE 3000
