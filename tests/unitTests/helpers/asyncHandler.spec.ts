import * as chai from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import { asyncHandler } from '../../../src/helpers/asyncHandler';
import { AppResponse } from '../../../src/helpers/AppResponse';

const { expect } = chai;

describe('asyncHandler Test Suite', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should not throw an error and not call AppResponse.serverError', async (): Promise<void> => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const callback = sinon.fake.resolves('');
    const serverError = sinon.fake();

    sinon.replace(AppResponse, 'serverError', serverError);
    const middleware = asyncHandler(callback);

    await middleware(request, response, sinon.fake());

    expect(callback.called).to.equal(true);
    expect(serverError.called).to.equal(false);
  });

  it('should throw an error and call AppResponse.serverError', async (): Promise<void> => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const callback = sinon.fake.rejects('');
    const serverError = sinon.fake();

    sinon.replace(AppResponse, 'serverError', serverError);

    const middleware = asyncHandler(callback);

    await middleware(request, response, sinon.fake());

    expect(callback.called).to.equal(true);
    expect(serverError.called).to.equal(true);
  });
});
