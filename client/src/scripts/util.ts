interface EnvVars {
    SERVICE_PORT: string,
}

export const getEnv = (): EnvVars => {
    const env = import.meta.env;
    return {
        SERVICE_PORT: env.VITE_SERVICE_PORT,
    };
};

export interface QueryResponse {
    data?: any,
    error?: Error,
    loading: boolean,
}
