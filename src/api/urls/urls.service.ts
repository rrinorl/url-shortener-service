import {nanoid} from "nanoid";
import { Url } from '../../../models/url'
import {throwNotFoundError} from "../../utils/error/errorUtils";
const DEFAULT_ID_SIZE = 7;
const ID_SIZE = process.env.SHORT_URL_LENGTH ? parseInt(process.env.SHORT_URL_LENGTH) : DEFAULT_ID_SIZE;

export { create, get };

async function create(url: string): Promise<any> {
  const id = nanoid(ID_SIZE)
  return await Url.create({
    hash: id,
    url
  });
}

async function get(hash: string): Promise<any> {
  const urlModelResult = await Url.findOne({where: {hash}});
  if(!urlModelResult) throwNotFoundError();
  return urlModelResult;
}
