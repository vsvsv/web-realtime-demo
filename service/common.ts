/**
 * Logs any message into console.
 */
export const logInfo = (...args: any) => {
    // eslint-disable-next-line no-console
    console.log('[service]', ...args);
};

interface EventData {
    now: string, // ISO timestamp
    randNum: number,
}

/**
 * Simulates an realtime backend event which should be transmitted to the client
 */
export const generateEvent = (): EventData => {
    const rand = Math.random();
    const now = new Date();
    return {
        now: now.toISOString(),
        randNum: rand,
    };
};

