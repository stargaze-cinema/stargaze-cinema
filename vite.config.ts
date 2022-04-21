import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { join } from 'path'

export default defineConfig({
    mode: process.env.NODE_ENV,
    root: __dirname,
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
    },
    envDir: './',
    envPrefix: 'APP_',
})
