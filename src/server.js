import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from "./utils/env.js";
import * as contactsServices from './services/contacts.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino({
    transport: {
      target: 'pino-pretty',
    },
  }),);
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await contactsServices.getAllContacts();
    res.json({
      status: 200,
      message: 'Successfuly found contacts!',
      data,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactsServices.getContactById(id);
    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${id} not found`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};