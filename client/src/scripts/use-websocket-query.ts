import { useEffect, useState } from 'react';
import { type QueryResponse, getEnv } from './util';

export const useWebsocketQuery = () => {
    const [query, setQuery] = useState<QueryResponse>({ loading: true });
    useEffect(() => {
        const env = getEnv();
        const ws = new WebSocket(`http://localhost:${env.SERVICE_PORT}/raw-ws`);
        ws.onmessage = (evt) => {
            try {
                const data = JSON.parse(evt.data);
                setQuery({ loading: false, data });
            } catch (e) {
                setQuery({ loading: false, error: e });
            }
        };
        ws.onerror = () => {
            setQuery({ loading: false, error: new Error('WebSocket communication error') });
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
        return () => {
            ws.close();
        };
    }, []);
    return query;
};
