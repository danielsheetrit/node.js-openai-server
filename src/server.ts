// packages
import express, { Application, Request, Response } from 'express';
import { createHttpTerminator } from 'http-terminator';
import bodyParser from 'body-parser';
import 'express-async-errors';
import http from 'http';
import cors from 'cors';

// local imports
import './process';

// routes
import openaiRoute from './routes/openai.route';

// middlewares
import { errorLogger, errorAction } from './middleware/error';

// ----------------------------------------------------------------

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3050;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

// ----------------------------------------------------------------

app.use('/openai', openaiRoute);

// ----------------------------------------------------------------

app.use(errorLogger);
app.use(errorAction);

// 404
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
