import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        cssMinify: 'esbuild',
        minify: 'terser',
        assetsDir: 'assets',
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
});