import * as chai from 'chai';
import * as sinon from 'sinon';
import { hashPassword, comparePassword } from '../../../src/helpers/passwordHelpers';

const { expect } = chai;

describe('passwordHelpers Test Suite', () => {
  const password = 'token';
  let passwordHash: string;

  after(() => {
    sinon.restore();
  });

  it('should hash a password and return the hashed strinng', () => {
    const result = hashPassword(password);

    passwordHash = result;

    expect(result).to.be.a('string');
  });

  it('should compare a password against its hash and return true', () => {
    const result = comparePassword(password, passwordHash);

    expect(result).to.equal(true);
  });
});
