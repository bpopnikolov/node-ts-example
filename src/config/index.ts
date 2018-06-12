import configJSON from './config.json';

const env = process.env.NODE_ENV || 'development';

export const config = configJSON[env];
