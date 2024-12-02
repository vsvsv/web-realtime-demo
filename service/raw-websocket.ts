import { WebSocketServer } from 'ws';
import { type Server } from 'http';
import url from 'url';
import { generateEvent } from './common';

/**
 * Sets up a WebSocket endpoint using 'ws' library
 */
export const registerRawWebsocketEndpoint = (httpServer: Server, path: string) => {
    const wsServer = new WebSocketServer({
        noServer: true,
        path,
    });

    // Manually handle 'upgrade' event only when URL matches `path`
    // to ensure that WS endpoint does not interfere with Socket.io endpoint
    httpServer.on('upgrade', (request, socket, head) => {
        const pathname = url.parse(request.url).pathname;
        if (pathname === path) {
            wsServer.handleUpgrade(request, socket, head, (ws) => {
                wsServer.emit('connection', ws);
            });
        }
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
