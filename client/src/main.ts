import React from 'react';
import ReactDOM from 'react-dom/client';

import { Header } from './Header';
import '../styles/globals.scss';

const setupReactRoot = (rootComponent: React.FC, rootElementId: string) => {
    const rootDiv = document.getElementById(rootElementId);
    if (rootDiv) {
        const reactRoot = ReactDOM.createRoot(rootDiv);
        reactRoot.render(React.createElement(rootComponent, {}, null));
    }
};

setupReactRoot(Header, 'root');

const env = (import.meta as unknown as { env: Record<string, any>}).env;
// eslint-disable-next-line no-console
console.log(`Will try to find service on port ${env.SERVICE_PORT}`);
