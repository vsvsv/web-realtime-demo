import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                app: './src/index.html',
            },
        },
    },
});
