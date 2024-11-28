import {
    useEffect,
    useRef,
    useState,
} from 'react';

import { IndicatorDot } from './components/IndicatorDot';
import { Preloader } from './components/Preloader';
import { useLongPollingQuery } from './scripts/use-long-polling-query';

export const LongPollingTimer = () => {
    const query = useLongPollingQuery();
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
        <div className="border rounded border-slate-500">
            <div className="flex justify-center items-center mb-4 mt-2">
                <h3 className="text-lg text-center border-b border-slate-500">Long Polling</h3>
                <IndicatorDot
                    className="ml-2 mt-1"
                    danger={!!query.error}
                    hidden={!dotShown && !query.error}
                />
            </div>
            <div className="m-4 flex justify-center">
                {query.data && (
                    <pre className="max-w-md p-2 px-4 rounded bg-slate-300 font-mono text-slate-200 overflow-scroll">
                        {JSON.stringify(query.data, undefined, '    ')}
                    </pre>
                )}
                {query.error && (
                    <pre className="max-w-md p-2 px-4 rounded bg-slate-300 font-mono text-red-700 overflow-scroll">
                        {query.error.message}
                    </pre>
                )}
                {query.loading && !(query.data || query.error) && (
                    <div className='flex justify-center'>
                        <Preloader />
                    </div>
                )}
            </div>
        </div>
    );
};
