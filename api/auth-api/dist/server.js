"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database/database");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
const PORT = Number(process.env['PORT']) || 3000;
app.use(express_1.default.json());
let allDomains = [
    "https://hoppscotch.io", "http://localhost:4200"
];
const allDomainsNormalized = allDomains.map(o => o.toLowerCase().replace(/\/$/, ''));
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        const originNormalized = origin.toLowerCase().replace(/\/$/, '');
        if (allDomainsNormalized.indexOf(originNormalized) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // <--- ESSENCIAL se usar cookies ou `withCredentials`
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions)); // Trata requisições OPTIONS manualmente
app.use('/api/auth', AuthRoutes_1.default);
app.get('/', (req, res) => {
    try {
        res.send(`Servidor Rodando!!`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Erro na rota principal: ${err.message}`);
        }
        res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT, async () => {
    try {
        await (0, database_1.startServer)().then(() => {
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
exports.default = app;
