import express from 'express';
import routes from './routes';
import cors from 'cors';

interface Error {
    status?: number;
    message?: string;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
