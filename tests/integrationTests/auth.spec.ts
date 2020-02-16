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
