import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { validAddressData } from '../mocks/address.mock';
import { authorization } from '../mocks/auth.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Address Endpoint Test Suite', () => {
  const createAddressEndpoint = '/api/v1/address';

  it('should return 400 when there is no authorization token in the header', async () => {
    const result = await chai
      .request(server)
      .post(createAddressEndpoint)
      .send(validAddressData);

    expect(result.body.statusCode).to.be.equal(400);
  });

  it('should return 401 when an invalid or expired authorization token is sent in the header', async () => {
    const result = await chai
      .request(server)
      .post(createAddressEndpoint)
      .send(validAddressData)
      .set('authorization', authorization.invalidToken);

    expect(result.body.statusCode).to.be.equal(401);
    expect(result.body.message).to.be.equal(
      'Your authentication token is either invalid or expired',
    );
  });

  it('should return 201 when valid address and authorizationToken is sent', async () => {
    const result = await chai
      .request(server)
      .post(createAddressEndpoint)
      .send(validAddressData)
      .set('authorization', authorization.validToken);

    expect(result.body.statusCode).to.be.equal(201);
    expect(result.body.message).to.be.equal(`${validAddressData.addressType} address created`);
  });

  it('should return 409 when the same valid address is being sent', async () => {
    const result = await chai
      .request(server)
      .post(createAddressEndpoint)
      .send(validAddressData)
      .set('authorization', authorization.validToken);

    expect(result.body.statusCode).to.be.equal(409);
    expect(result.body.message).to.be.equal(
      `You have a ${validAddressData.addressType} address already`,
    );
  });
});
