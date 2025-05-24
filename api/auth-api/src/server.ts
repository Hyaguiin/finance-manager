import express, { Router } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { startServer } from './config/database/database';
import authRoutes from './routes/AuthRoutes'

const app = express();
const PORT = Number(process.env['PORT']) || 3000;

app.use(express.json());

let allDomains = [
    "https://hoppscotch.io",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  try {
    res.send(`Servidor Rodando!!`);
  } catch (err) {
    if(err instanceof Error){

      console.error(`Erro na rota principal: ${err.message}`);
    }
    res.status(500).send('Internal Server Error');
  }
});


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
