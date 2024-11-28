/**
 * Logs any message into console.
 */
export const logInfo = (...args: any) => {
    // eslint-disable-next-line no-console
    console.log('[service INFO]', ...args);
};

export const logError = (...args: any) => {
    // eslint-disable-next-line no-console
    console.error('[service ERROR]', ...args);
};

interface EventData {
    connType: string,
    now: string, // ISO timestamp
    randNum: number,
}

/**
 * Simulates an realtime backend event which should be transmitted to the client
 */
export const generateEvent = (connType: string): EventData => {
    const rand = Math.random();
    const now = new Date();
    return {
        connType,
        now: now.toISOString(),
        randNum: rand,
    };
};

