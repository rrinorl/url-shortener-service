import { getMockReq, getMockRes } from '@jest-mock/express';
import * as urlsService from './urls.service';
import * as urlsController from './urls.controller';
import { StatusCodes } from 'http-status-codes';

jest.mock('./urls.service');

describe('urls.controller', () => {
  describe('post', () => {
    const mockUrl = 'https://www.google.com';
    const mockUrlsServiceCreate = urlsService.create as jest.Mock;
    const { res: mockRes } = getMockRes();
    describe('when url is not passed in body', () => {
      it('should return bad request', async () => {
        const mockReq = getMockReq({ body: {} });

        await urlsController.post(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });
    });
    describe('when url is not a valid url', () => {
      it('should return bad request', async () => {
        const mockReq = getMockReq({ body: { url: 'cool' } });

        await urlsController.post(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });
    });
    const mockReq = getMockReq({
      body: {
        url: mockUrl,
      },
    });
    describe('when urls service returns response', () => {
      it('should created status code with service response', async () => {
        const expectedReturnValue = { url: mockUrl };
        mockUrlsServiceCreate.mockReturnValue(expectedReturnValue);

        await urlsController.post(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(mockRes.json).toHaveBeenCalledWith(expectedReturnValue);
      });
    });
    describe('when urls service rejects', () => {
      it('should throw an error', async () => {
        const expectedReturnValue = 'err';
        mockUrlsServiceCreate.mockRejectedValue(expectedReturnValue);

        await expect(urlsController.post(mockReq, mockRes)).rejects.toEqual(expectedReturnValue);
      });
    });
  });
  describe('get', () => {
    const mockHash = 'sHwk7e1';
    const mockUrlsServiceGet = urlsService.get as jest.Mock;
    const { res: mockRes } = getMockRes();
    const mockReq = getMockReq({
      params: {
        hash: mockHash,
      },
    });
    describe('when urls service returns response', () => {
      it('should redirect to the url returned from the service', async () => {
        const mockUrl = 'https://www.google.com';
        const expectedReturnValue = { url: mockUrl };
        mockUrlsServiceGet.mockReturnValue(expectedReturnValue);

        await urlsController.get(mockReq, mockRes);

        expect(mockRes.redirect).toHaveBeenCalledWith(mockUrl);
      });
    });
    describe('when urls service rejects', () => {
      it('should throw an error', async () => {
        const expectedReturnValue = 'err';
        mockUrlsServiceGet.mockRejectedValue(expectedReturnValue);

        await expect(urlsController.get(mockReq, mockRes)).rejects.toEqual(expectedReturnValue);
      });
    });
  });
});
