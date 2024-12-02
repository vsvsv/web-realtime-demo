import { Server as SocketIOServer } from 'socket.io';
import { type Server } from 'http';
import { generateEvent } from './common';


/**
 * Sets up a SocketIO endpoint */
export const registerSocketIOEndpoint = (httpServer: Server, path: string) => {
    const socketIOServer = new SocketIOServer(httpServer, {
        path,
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ],
        },
        transports: ['websocket'],
    });

    let timerId: NodeJS.Timeout;
    const sendEvent = () => {
        const rndDelay = Math.floor(Math.random() * 2000);
        timerId = setTimeout(() => {
            socketIOServer.emit('status', JSON.stringify(generateEvent('socket-io')));
            sendEvent();
        }, 300 + rndDelay);
    };
    sendEvent();

    socketIOServer.on('close', () => {
        clearTimeout(timerId);
    });
};
