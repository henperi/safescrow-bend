import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { authorization } from '../mocks/auth.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Wallet Endpoint Test Suite', () => {
  const getWalletsEndpoint = '/api/v1/wallet';

  it('should return 200 when requesting to get an authorized user wallet', async () => {
    const result = await chai
      .request(server)
      .get(getWalletsEndpoint)
      .set('authorization', authorization.validToken);

    expect(result.body.statusCode).to.be.equal(200);
    expect(Object.keys(result.body.data)).to.contain('escrowWallet');
    expect(Object.keys(result.body.data)).to.contain('mainWallet');
  });
});
