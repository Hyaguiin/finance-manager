import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { startServer } from './src/config/database/database';
import authRoutes from './src/routes/AuthRoutes'; 

const app = express();
const PORT = process.env.PORT || 3000;
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

app.use('/auth', authRoutes);

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
      console.error(`Unknow Error`);
    }
  }
});

export default app;
