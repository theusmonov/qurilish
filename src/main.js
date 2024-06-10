import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path"
import config from './shared/config/index.js';
import connectDb from './db/index.js';
import ErrorHandle from "./shared/errors/errorStatus.js"
import mainRouter from './_api.js';
import { modelSync, relation } from './utils/relation.js';



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mainRouter);
app.use(ErrorHandle);

app.use(express.static(path.join(process.cwd(), "upload")))


const startAppServer = async () => {

await relation(),
await modelSync();

  try {
    await connectDb.authenticate();
    console.log('Database ga ulanish muvaffaqiyatli bajarildi!');
    await connectDb.sync({alter: true});
  } catch (err) {
    console.log('Database ga ulanishda xatolik', err);
  }
 
  app.listen(config.port, () => {
    console.log(`Server running on port http://localhost:${config.port}`);
  });
};

startAppServer();
