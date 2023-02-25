import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
config();
import mongoose from 'mongoose';

// @ts-ignore
import router from './router';
import { errorMiddleware } from './middlewares/errorMiddleware';

const PORT = process.env.PORT || 3000; // TODO: differenciate by environmnt
const MONGODB_URL = process.env.MONGO_CONNECTION_URL || '';

const app = express();
app.use(express.json());
app.use(express.raw());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {}, () => {
            console.log('MongoDB started...')
        })
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        });
    } catch(e) {
        console.log(e);
    }
};

start();