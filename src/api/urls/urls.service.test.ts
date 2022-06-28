import * as urlsService from './urls.service';
import * as urlsModel from './urls.model';

jest.mock('./urls.model');

describe('urls.service', () => {
  describe('post', () => {
    const mockUrlsModelCreate = urlsModel.create as jest.Mock;
    const url = 'https://www.google.com';
    describe('when urls model returns response', () => {
      it('should return the url model response', async () => {
        const expectedReturnValue = { url };
        mockUrlsModelCreate.mockResolvedValue(expectedReturnValue);

        await expect(urlsService.create(url)).resolves.toEqual(expectedReturnValue);
        expect(mockUrlsModelCreate).toHaveBeenCalledWith(url);
      });
    });
    describe('when urls model rejects', () => {
      it('should throw an error', async () => {
        const expectedReturnValue = { err: 'err' };
        mockUrlsModelCreate.mockRejectedValue(expectedReturnValue);

        await expect(urlsService.create(url)).rejects.toEqual(expectedReturnValue);
      });
    });
  });
  describe('get', () => {
    const mockUrlsModelGet = urlsModel.get as jest.Mock;
    const hash = 'sHwk7e1';
    describe('when urls model returns response', () => {
      it('should return the url model response', async () => {
        const expectedReturnValue = { hash };
        mockUrlsModelGet.mockResolvedValue(expectedReturnValue);

        await expect(urlsService.get(hash)).resolves.toEqual(expectedReturnValue);
        expect(mockUrlsModelGet).toHaveBeenCalledWith(hash);
      });
    });
    describe('when urls model rejects', () => {
      it('should throw an error', async () => {
        const expectedReturnValue = { err: 'err' };
        mockUrlsModelGet.mockRejectedValue(expectedReturnValue);

        await expect(urlsService.get(hash)).rejects.toEqual(expectedReturnValue);
      });
    });
  });
});
