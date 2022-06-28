import {createExpressApp} from "./config/express";
import * as apiHandler from './api';
import {Express} from "express";

export { createApp };


async function createApp(): Promise<Express>{
    const app = createExpressApp();
    await apiHandler.init(app);
    return app;
}
