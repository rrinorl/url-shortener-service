import * as urlsModel from './urls.model';

export { create, get };

async function create(url: string) {
  return urlsModel.create(url);
}

async function get(hash: string) {
  return urlsModel.get(hash);
}
