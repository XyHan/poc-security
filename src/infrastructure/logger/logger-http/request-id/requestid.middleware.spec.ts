import { RequestIdMiddleware } from './requestid.middleware';
import * as httpMocks from 'node-mocks-http';
import { isUUID } from '@nestjs/common/utils/is-uuid';

describe('requestId middleware', () => {
  const idRequest = 'e0d39004-88d2-4f77-a43b-95e616edbb47';
  it ('test with empty id request', () => {
    const req = httpMocks.createRequest({
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = httpMocks.createResponse();
    const middleware = new RequestIdMiddleware();
    const middlewareFunction = middleware.getMiddleWare();
    middlewareFunction(req, res, jest.fn());
    expect(isUUID(req.get('id_request'))).toBe(true);
    expect(isUUID(res._getHeaders().id_request)).toBe(true);
  });

  it ('test with an id request', () => {
    const req = httpMocks.createRequest({
      headers: {
        'Content-Type': 'application/json',
        'id_request': idRequest,
      },
    });
    const res = httpMocks.createResponse();
    const middleware = new RequestIdMiddleware();
    const middlewareFunction = middleware.getMiddleWare();
    middlewareFunction(req, res, jest.fn());
    expect(req.get('id_request')).toBe(idRequest);
    expect(res._getHeaders().id_request).toBe(idRequest);
  });
});
