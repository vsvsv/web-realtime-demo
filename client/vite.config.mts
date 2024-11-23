import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
    root: './',
    plugins: [reactPlugin()],
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
