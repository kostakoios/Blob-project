import express, { Application, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './routes/users';
import filesRouter from './routes/files';
import { errorHandler } from './errors/error-handler';

export function createApp() {
    const app: Application = express();
    
    app.use(cors<Request>());
    app.use(express.json());
    app.use(bodyParser.json());

    app.use('/api/users', usersRouter);
    app.use('/api/files', filesRouter);
    app.use(errorHandler);

    return app;
} 