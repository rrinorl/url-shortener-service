import {createExpressApp} from "./config/express";
import * as apiHandler from './api';
import {Express} from "express";
import * as prisma from './clients/prismaClient';

export { createApp };

async function createApp(): Promise<Express>{
    const app = createExpressApp();

    try{
        await prisma.$connect();
        console.info('Connected to database.');
    }
    catch(err){
        console.error({err}, 'Prisma cannot connect to database.');
        throw err;
    }
    apiHandler.init(app);
    return app;
}
