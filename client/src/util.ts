import { useEffect, useRef, useState } from 'react';

interface EnvVars {
    SERVICE_PORT: string,
}

export const getEnv = (): EnvVars => {
    const env = import.meta.env;
    return {
        SERVICE_PORT: env.VITE_SERVICE_PORT,
    };
};

interface QueryResponse {
    data?: any,
    error?: Error,
}


let lpFetchState: Promise<void> | null = null;
const lpReceiverCbs: ((r: QueryResponse) => any)[] | null = [];
let reconnectAttempts = 0;

const fetchLongPollingService = async () => {
    const env = getEnv();
    let fetchErr: Error;
    try {
        const response = await fetch(`http://localhost:${env.SERVICE_PORT}/long-poll`);
        const json = await response.json();
        for (const cb of lpReceiverCbs) {
            cb({ data: json });
        }
        reconnectAttempts = 0;
        return;
    } catch (err) {
        reconnectAttempts += 1;
        fetchErr = err;
    } finally {
        if (reconnectAttempts < 3) {
            lpFetchState = fetchLongPollingService();
        } else {
            for (const cb of lpReceiverCbs) {
                if (cb) {
                    cb({ error: fetchErr });
                }
            }
        }
    }
};

export const useLongPollingQuery = () => {
    const [query, setQuery] = useState<QueryResponse>({});
    if (!lpFetchState) {
        lpFetchState = fetchLongPollingService();
    }

    const cbIdx = useRef<number>(null);
    if (cbIdx.current === null) {
        cbIdx.current = lpReceiverCbs.push((res: QueryResponse) => {
            setQuery(res);
        }) - 1;
    }
    useEffect(() => {
        return () => {
            if (cbIdx.current) {
                lpReceiverCbs[cbIdx.current] = null;
            }
        };
    });
    return query;
};
