import React from 'react';
import ReactDOM from 'react-dom/client';

const Main = () => (
    <h1>Realtime Web API bench</h1>
);

const setupReactRoot = (rootComponent: React.ReactNode, rootElementId: string) => {
    const rootDiv = document.getElementById(rootElementId);
    if (rootDiv) {
        const reactRoot = ReactDOM.createRoot(rootDiv);
        reactRoot.render(rootComponent);
    }
};

setupReactRoot(<Main />, 'root');
