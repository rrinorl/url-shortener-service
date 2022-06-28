import { Express } from 'express';
import { createExpressApp } from './config/express';
import * as apiHandler from './api';
import prisma from './clients/prismaClient';

export { createApp };

async function createApp(): Promise<Express> {
  const app = createExpressApp();

  try {
    await prisma.$connect();
    console.info('Connected to database.');
  } catch (err) {
    console.error(
      { err },
      'Prisma cannot connect to database. Please check database connection. If first time running, connect to docker instance and run `npx prisma migrate dev` to create database.',
    );
    throw err;
  }
  apiHandler.init(app);
  return app;
}
