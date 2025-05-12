import { cleanEnv, str } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();

const env = cleanEnv(process.env, {
    JWT_SECRET: str(),
    JWT_EXPIRES: str({ default: '1h' }), 
    DATABASE_URL: str(),
    PORT: str({ default: '5000' })
});

export const databaseURL = env.DATABASE_URL;
export const PORT = env.PORT;
export const jwt_Secret = env.JWT_SECRET;
export const jwt_expires = env.JWT_EXPIRES; 