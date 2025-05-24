import { cleanEnv, str } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();
const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    PORT: str({ default: '6500' })
});
export const databaseURL = env.DATABASE_URL;
export const PORT = env.PORT;
