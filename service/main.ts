import dotenv from 'dotenv';
import express, {
    type Express,
    type Request,
    type Response,
} from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

import { logInfo, generateEvent } from './common';
import { registerRawWebsocketEndpoint } from './raw-websocket';
import { registerSocketIOEndpoint } from './socket-io';

const WORK_DIR = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app: Express = express();
app.use(cors());
const httpServer = createServer(app);
const port = process.env.SERVICE_PORT || 3000;

app.use('/', express.static(path.join(WORK_DIR, '../build/client')));

/**
 * Long-polling endpoint. Tries to send updates at random time intervals.
 */
app.get('/long-poll', (_req: Request, res: Response) => {
    const rndDelay = Math.floor(Math.random() * 2000);
    setTimeout(() => res.json(generateEvent('long-polling')), 300 + rndDelay);
});

/**
 * Event stream (SSE) endpoint.
 */
app.get('/sse', (req: Request, res: Response) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    let timerId: NodeJS.Timeout;
    const sendEvent = () => {
        const rndDelay = Math.floor(Math.random() * 2000);
        timerId = setTimeout(() => {
            res.write('event: message\n');
            res.write(`data: ${JSON.stringify(generateEvent('server-sent-events'))}\n\n`);
            sendEvent();
        }, 300 + rndDelay);
    };
    sendEvent();
    req.on('close', () => {
        clearTimeout(timerId);
    });

});

// Raw WebSocket endpoint (using 'ws' library)
registerRawWebsocketEndpoint(httpServer, '/raw-ws');

// Socket.io endpoint
registerSocketIOEndpoint(httpServer, '/socket-io');

httpServer.listen(port, () => {
    logInfo(`Sever is running on http://localhost:${port}`);
});
