import { useMemo } from 'react';
import { getEnv } from './util';

export const LongPollingTimer = () => {
    const env = useMemo(() => getEnv(), []);
    return (
        <div className="border rounded border-slate-500">
            <div className="flex justify-center mb-4 mt-2">
                <h3 className="text-lg text-center border-b border-slate-500">Long Polling</h3>
            </div>
            <div className="m-4 flex justify-center">
                <div className="max-w-md p-2 px-4 rounded bg-slate-300 font-mono text-slate-200">
                    {JSON.stringify(env, undefined, 4)}
                </div>
            </div>
        </div>
    );
};

