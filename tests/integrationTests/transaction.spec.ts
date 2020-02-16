import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { authorization } from '../mocks/auth.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Transaction Endpoint Test Suite', () => {
  const getTransactionsEndpoint = '/api/v1/transactions';

  it('should return 200 when requesting to get all transactions', async () => {
    const result = await chai
      .request(server)
      .get(getTransactionsEndpoint)
      .set('authorization', authorization.validToken);

    expect(result.body.statusCode).to.be.equal(200);
  });
});
