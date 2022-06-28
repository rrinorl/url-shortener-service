import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import * as urlsService from './urls.service';
import * as urlsController from './urls.controller';

jest.mock('./urls.service');

describe('urls.controller', () => {
  describe('get', () => {
    describe('when urls service returns response', () => {
      it('should return the urls service response with a success status', () => {
        const mockUrlsServiceGet = urlsService.get as jest.Mock;
        const { res: mockRes } = getMockRes();
        const mockReq = getMockReq();
        const expectedReturnValue = 'pong';
        mockUrlsServiceGet.mockReturnValue(expectedReturnValue);

        urlsController.get(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockRes.send).toHaveBeenCalledWith(expectedReturnValue);
      });
    });
  });
});
