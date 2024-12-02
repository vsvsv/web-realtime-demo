import {type Config} from 'tailwindcss';

import { fileURLToPath } from 'url';
import path from 'path';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

export default {
    content: [
        path.join(SCRIPT_DIR, '/client/index.html'),
        path.join(SCRIPT_DIR, '/client/**/*.{js,ts,jsx,tsx}'),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config;

