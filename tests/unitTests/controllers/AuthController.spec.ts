import * as chai from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';
import AuthController from '../../../src/controllers/AuthController';
import UserRepository from '../../../src/repositories/UserRepository';
import { AppResponse } from '../../../src/helpers/AppResponse';
import { EmailHelper } from '../../../src/helpers/EmailHelper';
import * as passwordHelpers from '../../../src/helpers/passwordHelpers';
import * as tokenHelpers from '../../../src/helpers/tokenHelpers';

const { expect } = chai;

describe('AuthController Test Suite', () => {
  describe('handlePasswordResetRequest Test Suite', () => {
    afterEach(() => {
      sinon.restore();
    });

    const request = httpMocks.createRequest({
      body: {
        email: 'email',
      },
    });

    const response = httpMocks.createResponse();

    it('should send an email to user and call AppResponse.success', async () => {
      const getByEmail = sinon.fake.resolves({ uniqueId: '', Profile: {}, secretKey: '' });
      const generatePasswordResetToken = sinon.fake();
      const success = sinon.fake();
      const sendEmail = sinon.fake();

      sinon.replace(UserRepository, 'getByEmail', getByEmail);
      sinon.replace(EmailHelper, 'sendEmail', sendEmail);
      sinon.replace(AppResponse, 'success', success);
      sinon.replace(tokenHelpers, 'generatePasswordResetToken', generatePasswordResetToken);

      await AuthController.handlePasswordResetRequest(request, response);

      expect(getByEmail.called).to.equal(true);
      expect(generatePasswordResetToken.called).to.equal(true);
      expect(sendEmail.called).to.equal(true);
      expect(success.called).to.equal(true);
    });

    it('should return notFound response if email does not belong to a registered user', async () => {
      const getByEmail = sinon.fake.resolves(null);
      const notFound = sinon.fake();

      sinon.replace(UserRepository, 'getByEmail', getByEmail);
      sinon.replace(AppResponse, 'notFound', notFound);

      await AuthController.handlePasswordResetRequest(request, response);

      expect(getByEmail.called).to.equal(true);
      expect(notFound.called).to.equal(true);
    });
  });

  describe('resetPassword Test Suite', () => {
    afterEach(() => {
      sinon.restore();
    });

    const request = httpMocks.createRequest();

    const response = httpMocks.createResponse();

    response.locals.user = { email: '' };

    it('should send an email to user and call AppResponse.success', async () => {
      const updatePassword = sinon.fake.resolves({ email: '', Profile: {} });
      const hashPassword = sinon.fake();
      const success = sinon.fake();
      const sendEmail = sinon.fake();
      const generateUserToken = sinon.fake();
      const setupTokenData = sinon.fake();

      sinon.replace(UserRepository, 'updatePassword', updatePassword);
      sinon.replace(EmailHelper, 'sendEmail', sendEmail);
      sinon.replace(AppResponse, 'success', success);
      sinon.replace(passwordHelpers, 'hashPassword', hashPassword);
      sinon.replace(tokenHelpers, 'generateUserToken', generateUserToken);
      sinon.replace(tokenHelpers, 'setupTokenData', setupTokenData);

      await AuthController.resetPassword(request, response);

      expect(updatePassword.called).to.equal(true);
      expect(hashPassword.called).to.equal(true);
      expect(sendEmail.called).to.equal(true);
      expect(generateUserToken.called).to.equal(true);
      expect(setupTokenData.called).to.equal(true);
      expect(success.called).to.equal(true);
    });
  });
});
