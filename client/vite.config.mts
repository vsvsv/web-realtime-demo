import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: '../build/client',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                app: 'index.html',
            },
        },
    },
});
