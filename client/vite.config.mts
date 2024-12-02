import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import fs from 'fs';
import reactPlugin from '@vitejs/plugin-react';


export default defineConfig(({ command }) => {
    let envVarsFromFile: Record<string, any> = {};
    try {
        if (command === 'build') {
            const envVarsBuf = fs.readFileSync('../.env');
            envVarsFromFile = dotenv.parse(envVarsBuf);
        } else { // serve
            const envVarsBuf = fs.readFileSync('.env');
            envVarsFromFile = dotenv.parse(envVarsBuf);

        }
    } catch {
        // eslint-disable-next-line no-console
        console.error('Cannot find ".env" file in the root of the project');
    }
    process.env = {
        ...process.env,
        VITE_SERVICE_PORT: envVarsFromFile.SERVICE_PORT,
    };
    return {
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
    };
});
