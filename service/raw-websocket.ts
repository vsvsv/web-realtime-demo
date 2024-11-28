import { WebSocketServer } from 'ws';
import { type Server } from 'http';
import { generateEvent } from './common';

/**
 * Sets up a WebSocket endpoint using 'ws' library
 */
export const registerRawWebsocketEndpoint = (httpServer: Server, slug: string) => {
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: slug,
    });

    let timerId: NodeJS.Timeout;
    const sendEvent = () => {
        const rndDelay = Math.floor(Math.random() * 2000);
        timerId = setTimeout(() => {
            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify(generateEvent('raw-websocket')));
            });
            sendEvent();
        }, 300 + rndDelay);
    };
    sendEvent();


    wsServer.on('close', () => {
        clearTimeout(timerId);
    });
};
