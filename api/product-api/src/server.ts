import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { startServer } from './config/Database';
import productRoutes from './routes/ProductRoutes'

const app = express();
const PORT = process.env['PORT'] || 3000;
app.use(express.json());

console.log('CORS_ALLOWED_DOMAINS:', process.env['CORS_ALLOWED_DOMAINS']); // <-- aqui

const allowedDomains = process.env['CORS_ALLOWED_DOMAINS']?.split(',') || [];

console.log('allowedDomains array:', allowedDomains); // <-- aqui

const corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log('Request origin:', origin); 
    if (allowedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
//app.options('*', cors(corsOptions));

app.use('/api/product', productRoutes);
console.log('Registering product routes on path: /product');


app.get('/', (req, res) => {
  try {
    res.send(`Servidor Rodando!!`)
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
})

app.listen(PORT, async () => {
  try {
    await startServer().then(() => {
      console.log(`DB✅✅, Connected on: ${PORT}`);
    }).catch((err) => {
      console.error(`Erro ao iniciar ou ao conectar no banco de dados!`);
      throw new Error(`Error: ${err}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err}`);
    } else {
      console.error(`Unknown Error`);
    }
  }
});

export default app;
