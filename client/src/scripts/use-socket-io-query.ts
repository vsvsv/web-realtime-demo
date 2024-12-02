import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { type QueryResponse, getEnv } from './util';


export const useSocketIOQuery = () => {
    const [query, setQuery] = useState<QueryResponse>({ loading: true });
    useEffect(() => {
        const env = getEnv();
        const socket = io(`http://localhost:${env.SERVICE_PORT}`, {
            path: '/socket-io',
            transports: ['websocket'],
        });
        socket.on('status', (json) => {
            try {
                const data = JSON.parse(json);
                setQuery({ loading: false, data });
            } catch (e) {
                setQuery({ loading: false, error: e });
            }
        });
        socket.on('connect_error', (err) => {
            setQuery({ loading: false, error: err });
            if (socket.connected) {
                socket.close();
            }
        });
        return () => {
            socket.close();
        };
    }, []);
    return query;
};
