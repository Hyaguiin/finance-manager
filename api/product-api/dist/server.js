"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const Database_1 = require("./config/Database");
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const app = (0, express_1.default)();
const PORT = process.env['PORT'] || 3000;
app.use(express_1.default.json());
console.log('CORS_ALLOWED_DOMAINS:', process.env['CORS_ALLOWED_DOMAINS']); // <-- aqui
const allowedDomains = process.env['CORS_ALLOWED_DOMAINS']?.split(',') || [];
console.log('allowedDomains array:', allowedDomains); // <-- aqui
const corsOptions = {
    origin: function (origin, callback) {
        console.log('Request origin:', origin);
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
//app.options('*', cors(corsOptions));
app.use('/api/product', ProductRoutes_1.default);
console.log('Registering product routes on path: /product');
app.get('/', (req, res) => {
    try {
        res.send(`Servidor Rodando!!`);
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
    }
});
app.listen(PORT, async () => {
    try {
        await (0, Database_1.startServer)().then(() => {
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
