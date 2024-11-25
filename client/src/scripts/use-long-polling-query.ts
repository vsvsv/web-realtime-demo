import { useEffect, useRef, useState } from 'react';
import { type QueryResponse, getEnv } from './util';

let reconnectAttempts = 0;
const fetchLongPollingService = async (
    cb: (r: QueryResponse) => any,
    shoudContinue: { current: boolean },
) => {
    if (shoudContinue.current) {
        const env = getEnv();
        let fetchErr: Error;

        cb({ loading: true });
        try {
            const response = await fetch(`http://localhost:${env.SERVICE_PORT}/long-poll`);
            const json = await response.json();
            if (shoudContinue.current) cb({ data: json, loading: false });
            reconnectAttempts = 0;
            return;
        } catch (err) {
            reconnectAttempts += 1;
            fetchErr = err;
        } finally {
            if (reconnectAttempts < 3) {
                fetchLongPollingService(cb, shoudContinue);
            } else {
                if (shoudContinue.current) cb({ error: fetchErr, loading: false });
            }
        }
    }
};

export const useLongPollingQuery = () => {
    const [query, setQuery] = useState<QueryResponse>({ loading: false });
    const shoudContinue = useRef<boolean>(true);
    useEffect(() => {
        shoudContinue.current = true;
        fetchLongPollingService((res: QueryResponse) => {
            if (res.loading) {
                setQuery((prevQuery) => ({ ...prevQuery, ...res }));
            } else {
                setQuery(res);
            }
        }, shoudContinue);
        return () => {
            shoudContinue.current = false;
        };
    }, []);
    return query;
};
