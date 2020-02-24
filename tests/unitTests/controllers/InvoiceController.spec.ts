import * as chai from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';
import InvoiceController from '../../../src/controllers/InvoiceController';
import InvoiceRepository from '../../../src/repositories/InvoiceRepository';
import { AppResponse } from '../../../src/helpers/AppResponse';

const { expect } = chai;

describe('InvoiceController Test Suite', () => {
  describe('createInvoice Test Suite', () => {
    afterEach(() => {
      sinon.restore();
    });

    const request = httpMocks.createRequest({
      body: { invoiceItems: [] },
    });

    const response = httpMocks.createResponse();

    it('should create an Invoice and call AppResponse.created', async () => {
      const create = sinon.fake.resolves({});
      const created = sinon.fake();

      sinon.replace(InvoiceRepository, 'create', create);
      sinon.replace(AppResponse, 'created', created);

      await InvoiceController.createInvoice(request, response);

      expect(create.called).to.equal(true);
      expect(created.called).to.equal(true);
    });
  });
});
