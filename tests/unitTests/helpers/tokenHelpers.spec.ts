import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import {
  generatePasswordResetToken,
  validatePasswordResetToken,
} from '../../../src/helpers/tokenHelpers';
import { passwordResetTokenData } from './mocks/tokenHelpers.mock';

const { expect } = chai;

describe('tokenHelpers Test Suite', () => {
  const token = 'token';
  const tokenValue = 'value';

  after(() => {
    sinon.restore();
  });

  describe('generatePasswordResetToken Test Suite', () => {
    it('should return a password reset token', () => {
      const fake = sinon.fake.returns(token);

      sinon.replace(jwt, 'sign', fake);

      const returnValue = generatePasswordResetToken(passwordResetTokenData);

      expect(fake.called).to.equal(true);
      expect(returnValue).to.equal(token);
    });
  });

  describe('validatePasswordResetToken Test Suite', () => {
    it('should return validated password reset token data', () => {
      const fake = sinon.fake.returns(tokenValue);

      sinon.replace(jwt, 'verify', fake);

      const returnValue = validatePasswordResetToken(token);

      expect(fake.called).to.equal(true);
      expect(fake.calledWith(token)).to.equal(true);
      expect(returnValue).to.equal(tokenValue);
    });
  });
});
