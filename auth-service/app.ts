import express from 'express';
import cors from 'cors';
import userRouters from './routers/userRouters';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouters);

export default app;
