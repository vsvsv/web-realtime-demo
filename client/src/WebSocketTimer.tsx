import {
    useEffect,
    useRef,
    useState,
} from 'react';

import { Preloader } from './components/Preloader';
import { Card } from './components/Card';
import { useWebsocketQuery } from './scripts/use-websocket-query';

export const WebSocketTimer = () => {
    const query = useWebsocketQuery();
    const [dotShown, setDotShown] = useState(false);
    const timerHandle = useRef<NodeJS.Timeout>();
    useEffect(() => {
        if (query.data && !query.error) {
            if (timerHandle.current) {
                clearTimeout(timerHandle.current);
            }
            setDotShown(true);
            timerHandle.current = setTimeout(() => setDotShown(false), 100);
        }
    }, [query]);
    return (
        <Card
            title="WebSocket (Raw)"
            indicatorDotHidden={!dotShown && !query.error}
            indicatorDotDanger={!!query.error}
        >
            {query.data && (
                <pre className="max-w-md p-2 px-4 code-box">
                    {JSON.stringify(query.data, undefined, '    ')}
                </pre>
            )}
            {query.error && (
                <pre className="max-w-md p-2 px-4 code-box">
                    {query.error.message}
                </pre>
            )}
            {query.loading && !(query.data || query.error) && (
                <div className='flex justify-center'>
                    <Preloader />
                </div>
            )}
        </Card>
    );
};
