import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { startServer } from './src/config/database/database';
import financeRoutes from './src/routes/FinanceRoutes';
const app = express();
const PORT = process.env['PORT'] || 3000;
app.use(express.json());
const allowedDomains = process.env['CORS_ALLOWED_DOMAINS']?.split(',') || [];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));
app.use('/', financeRoutes);
app.listen(PORT, async () => {
    try {
        await startServer().then(() => {
            console.log(`DB✅✅, Connected on: ${PORT}`);
        }).catch((err) => {
            console.error(`Erro ao iniciar ou ao conectar no banco de dados!`);
            throw new Error(`Error: ${err}`);
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err}`);
        }
        else {
            console.error(`Unknown Error`);
        }
    }
});
export default app;
