import dotenv from 'dotenv';
import express, {
    type Express,
    type Request,
    type Response,
} from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.SERVICE_PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Express server is running...');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[service] Sever is running on http://localhost:${port}`);
});
