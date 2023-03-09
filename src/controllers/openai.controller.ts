import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const getQuery = async (req: Request, res: Response) => {
  const { text } = req.query;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Correct this to standard English: ${text}`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  //   const { data } = await openai.listModels();
  console.log(response.data);

  res.status(200).json({ msg: 'success' });
};

export { getQuery };
