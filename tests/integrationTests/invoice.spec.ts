import * as chai from 'chai';
import * as express from 'express';

import bootstrapApp from '../../src/bootstrapApp';
import { merchantSignupData } from '../mocks/auth.mock';
import { inValidInvoiceData1, inValidInvoiceData2, validInvoiceData } from '../mocks/invoice.mock';

import chaiHttp = require('chai-http');

const app = express();

const { expect } = chai;
const server = bootstrapApp(app);

chai.use(chaiHttp);

describe('Invoice Endpoint Test Suite', () => {
  let token: string;

  before(async () => {
    const result = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(merchantSignupData);

    token = result.body.data.token;
  });

  describe('create Invoice Endpoint Test Suite', () => {
    const endpoint = '/api/v1/invoice';

    it('should return 400 when invoiceItems price do not add up', async () => {
      const result = await chai
        .request(server)
        .post(endpoint)
        .send(inValidInvoiceData1)
        .set('authorization', token);

      expect(result.status).to.be.equal(400);
      expect(result.body.statusCode).to.be.equal(400);
      expect(result.body.errors).to.be.an('object');
    });

    it('should return 400 when total amount do not add up', async () => {
      const result = await chai
        .request(server)
        .post(endpoint)
        .send(inValidInvoiceData2)
        .set('authorization', token);

      expect(result.status).to.be.equal(400);
      expect(result.body.statusCode).to.be.equal(400);
      expect(result.body.errors).to.be.an('object');
    });

    it('should return 201 when valid invoice data is sent', async () => {
      const result = await chai
        .request(server)
        .post(endpoint)
        .send(validInvoiceData)
        .set('authorization', token);

      expect(result.status).to.be.equal(201);
      expect(result.body.statusCode).to.be.equal(201);
    });
  });
});
