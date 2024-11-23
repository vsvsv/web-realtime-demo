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

export const fetchLongPollingService = async (): Promise<QueryResponse> => {
    const env = getEnv();
    try {
        const response = await fetch(`http://localhost:${env.SERVICE_PORT}`);
        const json = await response.json();
        return {
            data: json,
        };
    } catch (err) {
        return {
            error: err,
        };
    }
};
