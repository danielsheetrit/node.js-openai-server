import { Router } from 'express';
import { getQuery } from '../controllers/openai.controller';

const openaiRoute = Router();

openaiRoute.get('/query', getQuery);

export default openaiRoute;
