import {nanoid} from "nanoid";
import prisma from '../../clients/prismaClient';
import {throwNotFoundError} from "../../utils/error/errorUtils";

const DEFAULT_ID_SIZE = 7;
const ID_SIZE = process.env.SHORT_URL_LENGTH ? parseInt(process.env.SHORT_URL_LENGTH) : DEFAULT_ID_SIZE;

export { create, get };

async function create(url: string){
    const hash = nanoid(ID_SIZE);
    return await prisma.url.create({
        data:{
            hash,
            url
        }
    });
}

async function get(hash: string){
    const urlModel = await prisma.url.findUnique({
        where: {
            hash
        }
    });
    if(!urlModel) throwNotFoundError('Cannot find shortened url.');
    return urlModel;
}
