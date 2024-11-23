import dotenv from 'dotenv';
import express, {
    type Express,
    type Request,
    type Response,
} from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.SERVICE_PORT || 3000;

/**
 * Logs any message into console.
 */
const logInfo = (...args: any) => {
    // eslint-disable-next-line no-console
    console.log('[service]', ...args);
};

app.get('/', (_req: Request, res: Response) => {
    res.send('Express server is running...');
});

/**
 * Long-polling endpoint. Tries to send updates every second.
 */
app.get('/long-poll', (_req: Request, res: Response) => {
    logInfo('(long-polling) Client connected, staring to send updates...');

    const sendUpdate = () => {
        const rand = Math.random();
        const now = new Date();
        res.json({
            now_iso: now.toISOString(),
            randomNumber: rand,
        });
    };
    sendUpdate();
    setTimeout(sendUpdate, 1000);

    res.send('');
});

app.listen(port, () => {
    logInfo(`Sever is running on http://localhost:${port}`);
});
