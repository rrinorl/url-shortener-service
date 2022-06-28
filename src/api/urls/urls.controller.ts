import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as urlsService from './urls.service';

export { post, get };

async function post(req: Request, res: Response): Promise<void> {
  const { url } = req.body;
  if(!url) {
    res.status(StatusCodes.BAD_REQUEST).json({error: 'Url field in body is required'})
    return;
  }
  if(!url.startsWith('http')){
    res.status(StatusCodes.BAD_REQUEST).json({error: 'Url must start with protocol.'});
    return;
  }

  const urlModelResult = await urlsService.create(url);
  res.status(StatusCodes.CREATED).json(urlModelResult);
}

async function get(req: Request, res: Response): Promise<void> {
  const { hash } = req.params;
  const urlModelResult = await urlsService.get(hash);
  res.redirect(urlModelResult.url);
}
