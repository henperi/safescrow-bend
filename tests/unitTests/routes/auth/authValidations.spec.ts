import * as chai from 'chai';
import * as sinon from 'sinon';
import * as Joi from '@hapi/joi';
import * as httpMocks from 'node-mocks-http';
import { validate } from '../../../../src/routes/auth/authValidations';
import { AppResponse } from '../../../../src/helpers/AppResponse';

const { expect } = chai;

describe('authValidations Test Suite', () => {
  describe('validate Test Suite', () => {
    afterEach(() => {
      sinon.restore();
    });

    const request = httpMocks.createRequest();

    const response = httpMocks.createResponse();

    it('should validate request body and call next', async () => {
      const validateAsync = sinon.fake.resolves('');
      const nextFn = sinon.fake();
      const schema = Joi.object({});

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      sinon.replace(schema, 'validateAsync', validateAsync);

      const middleware = validate(schema);

      await middleware(request, response, nextFn);

      expect(validateAsync.called).to.equal(true);
      expect(nextFn.called).to.equal(true);
    });

    it('should return badRequest response', async () => {
      const validateAsync = sinon.fake.rejects(new Error());
      const nextFn = sinon.fake();
      const badRequest = sinon.fake();

      const schema = Joi.object({});

      const middleware = validate(schema);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      sinon.replace(schema, 'validateAsync', validateAsync);
      sinon.replace(AppResponse, 'badRequest', badRequest);
      await middleware(request, response, nextFn);

      expect(badRequest.called).to.equal(true);
    });
  });
});
