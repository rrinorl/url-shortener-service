import * as urlsService from './urls.service';

describe('urls.service', () => {
  describe('get', () => {
    it('should return "pong"', () => {
      expect(urlsService.get()).toEqual('pong');
    });
  });
});
