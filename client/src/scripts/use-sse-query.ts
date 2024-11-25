import { useEffect, useState } from 'react';
import { type QueryResponse, getEnv } from './util';

export const useSseQuery = () => {
    const [query, setQuery] = useState<QueryResponse>({ loading: true });
    useEffect(() => {
        const env = getEnv();
        const eventSource = new EventSource(`http://localhost:${env.SERVICE_PORT}/sse`);
        eventSource.onmessage = (evt) => {
            try {
                const data = JSON.parse(evt.data);
                setQuery({ loading: false, data });
            } catch (e) {
                setQuery({ loading: false, error: e });
            }
        };
        eventSource.onerror = () => {
            setQuery({ loading: false, error: new Error('SSE communication error') });
            eventSource.close();
        };
        return () => {
            eventSource.close();
        };
    }, []);
    return query;
};
