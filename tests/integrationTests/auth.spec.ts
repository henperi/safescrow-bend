import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { validSignupData, invalidSignupData, authorization } from '../mocks/auth.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Auth Endpoint Test Suite', () => {
  describe('Signup Endpoint Test Suite', () => {
    const signupEndpoint = '/api/v1/auth/signup';

    it('should return 400 when invalid data is sent', async () => {
      const result = await chai
        .request(server)
        .post(signupEndpoint)
        .send(invalidSignupData);

      expect(result.body.statusCode).to.be.equal(400);
    });

    it('should return 201 when valid signup data is sent', async () => {
      const result = await chai
        .request(server)
        .post(signupEndpoint)
        .send(validSignupData);

      authorization.validToken = result.body.data.token;

      expect(result.body.statusCode).to.be.equal(201);
    });

    it('should return 409 when sendinding an existing user', async () => {
      const result = await chai
        .request(server)
        .post(signupEndpoint)
        .send(validSignupData);

      expect(result.body.statusCode).to.be.equal(409);
    });
  });

  describe('Password Reset Endpoint Test Suite', () => {
    const passwordResetEndpoint = '/api/v1/auth/reset-password';

    it('should return 400 when invalid data is sent', async () => {
      const result = await chai
        .request(server)
        .post(passwordResetEndpoint)
        .send({ email: invalidSignupData.email });

      expect(result.status).to.be.equal(400);
      expect(result.body.statusCode).to.be.equal(400);
      expect(result.body.errors).to.be.an('object');
    });

    it('should return 404 when email in not found', async () => {
      const notFoundEmail = 'wqasde@wqasd.com';
      const result = await chai
        .request(server)
        .post(passwordResetEndpoint)
        .send({ email: notFoundEmail });

      expect(result.status).to.be.equal(404);
      expect(result.body.statusCode).to.be.equal(404);
      expect(result.body.message).to.be.equal(`User with email: ${notFoundEmail} does not exist`);
    });

    it('should return 200 when reset link is sent', async () => {
      const result = await chai
        .request(server)
        .post(passwordResetEndpoint)
        .send({ email: validSignupData.email });

      expect(result.status).to.be.equal(200);
      expect(result.body.statusCode).to.be.equal(200);
      expect(result.body.message).to.be.equal(
        `Successful. A reset link has been sent to ${validSignupData.email}`,
      );
    });
  });
});
