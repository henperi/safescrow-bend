import * as chai from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';
import { checkUser } from '../../../src/middlewares/auth';
import UserRepository from '../../../src/repositories/UserRepository';
import { AppResponse } from '../../../src/helpers/AppResponse';
import * as tokenHelpers from '../../../src/helpers/tokenHelpers';

const { expect } = chai;

describe('auth middleware Test Suite', () => {
  describe('checkUser Test Suite', () => {
    afterEach(() => {
      sinon.restore();
    });

    const request = httpMocks.createRequest({
      params: {
        tokenString: 'token',
      },
    });

    const response = httpMocks.createResponse();

    it('should add user to response and call next', async () => {
      const getByUniqueIdAndSecretKey = sinon.fake.resolves({ uniqueId: '' });
      const validatePasswordResetToken = sinon.fake.returns({ uniqueId: '', secretKey: '' });
      const nextFn = sinon.fake();

      sinon.replace(UserRepository, 'getByUniqueIdAndSecretKey', getByUniqueIdAndSecretKey);
      sinon.replace(tokenHelpers, 'validatePasswordResetToken', validatePasswordResetToken);

      await checkUser(request, response, nextFn);

      expect(validatePasswordResetToken.called).to.equal(true);
      expect(getByUniqueIdAndSecretKey.called).to.equal(true);
      expect(nextFn.called).to.equal(true);
      expect(response.locals.user).to.deep.equal({ uniqueId: '' });
    });

    it('should return badRequest response on invalid/expired password reset token', async () => {
      const validatePasswordResetToken = sinon.fake.throws(new Error());
      const badRequest = sinon.fake();
      const nextFn = sinon.fake();

      sinon.replace(tokenHelpers, 'validatePasswordResetToken', validatePasswordResetToken);
      sinon.replace(AppResponse, 'badRequest', badRequest);

      await checkUser(request, response, nextFn);

      expect(validatePasswordResetToken.called).to.equal(true);
      expect(badRequest.called).to.equal(true);
      expect(nextFn.called).to.equal(false);
    });

    it('should return notFound response on invalid/used token', async () => {
      const validatePasswordResetToken = sinon.fake.returns({ uniqueId: '', secretKey: '' });
      const getByUniqueIdAndSecretKey = sinon.fake();
      const notFound = sinon.fake();
      const nextFn = sinon.fake();

      sinon.replace(tokenHelpers, 'validatePasswordResetToken', validatePasswordResetToken);
      sinon.replace(UserRepository, 'getByUniqueIdAndSecretKey', getByUniqueIdAndSecretKey);
      sinon.replace(AppResponse, 'notFound', notFound);

      await checkUser(request, response, nextFn);

      expect(getByUniqueIdAndSecretKey.called).to.equal(true);
      expect(notFound.called).to.equal(true);
      expect(nextFn.called).to.equal(false);
    });
  });
});
