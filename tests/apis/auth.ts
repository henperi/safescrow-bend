import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { validSignupData, invalidSignupData } from './auth.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Auth Endpoint Test Suite', () => {
  const signupEndpoint = '/api/v1/auth/';

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

    expect(result.body.statusCode).to.be.equal(201);
  });

  it('should return 409 when sendinding an existing user', async () => {
    const result = await chai
      .request(server)
      .post(signupEndpoint)
      .send(validSignupData);

    expect(result.body.statusCode).to.be.equal(409);
  });

  // it('should return 500 when there is a database error', async () => {
  //   const db = await import('../../src/db/models');

  //   await db.createModels().sequelize.drop();
  //   const result = await chai
  //     .request(server)
  //     .post(signupEndpoint)
  //     .send(validSignupData);

  //   expect(result.body.statusCode).to.be.equal(500);
  // });
});
