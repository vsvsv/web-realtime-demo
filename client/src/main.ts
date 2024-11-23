import React from 'react';
import ReactDOM from 'react-dom/client';

import { Main } from './Main';
import '../styles/globals.scss';

const setupReactRoot = (rootComponent: React.FC, rootElementId: string) => {
    const rootDiv = document.getElementById(rootElementId);
    if (rootDiv) {
        const reactRoot = ReactDOM.createRoot(rootDiv);
        reactRoot.render(React.createElement(rootComponent, {}, null));
    }
};

setupReactRoot(Main, 'root');
