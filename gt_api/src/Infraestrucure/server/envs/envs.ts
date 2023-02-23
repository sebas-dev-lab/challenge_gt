import { enviroments } from './envs.config';

enviroments;

export const connEnvs = {
    // ============ server envs =========== //
    server_port: process.env.PORT
};

export const useCases = {
    // ============ use cases envs =========== //

};

export const authCase = {
    // ============ auth cases envs =========== //
    auth_username: process.env.AUTH_USERNAME,
    auth_password: process.env.AUTH_PASSWORD,
    auth_secret: process.env.AUTH_SECRET ? String(process.env.AUTH_SECRET) : 'secret'
};
