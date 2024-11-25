import dotenv from 'dotenv';
import express, {
    type Express,
    type Request,
    type Response,
} from 'express';
import cors from 'cors';

import { logInfo, generateEvent } from './common';

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.SERVICE_PORT || 3000;


app.get('/', (_req: Request, res: Response) => {
    res.send('Express server is running...');
});

/**
 * Long-polling endpoint. Tries to send updates at random time intervals.
 */
app.get('/long-poll', (_req: Request, res: Response) => {
    const rndDelay = Math.floor(Math.random() * 2000);
    setTimeout(() => res.json(generateEvent()), 300 + rndDelay);
});

app.listen(port, () => {
    logInfo(`Sever is running on http://localhost:${port}`);
});
