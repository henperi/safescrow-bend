/* eslint-disable no-underscore-dangle */
import * as chai from 'chai';
import * as httpMocks from 'node-mocks-http';
import { AppResponse } from '../../../src/helpers/AppResponse';

const { expect } = chai;

describe('AppResponse Test Suite', () => {
  it('AppResponse.success should return status 200', () => {
    const response = httpMocks.createResponse();

    AppResponse.success(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(200);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'data');
    expect(body.statusCode).to.equal(200);
    expect(body.success).to.equal(true);
  });

  it('AppResponse.created should return status 201', () => {
    const response = httpMocks.createResponse();

    AppResponse.created(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(201);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'data');
    expect(body.statusCode).to.equal(201);
    expect(body.success).to.equal(true);
  });

  it('AppResponse.badRequest should return status 400', () => {
    const response = httpMocks.createResponse();

    AppResponse.badRequest(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(400);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(400);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.unAuthorized should return status 401', () => {
    const response = httpMocks.createResponse();

    AppResponse.unAuthorized(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(401);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(401);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.notFound should return status 404', () => {
    const response = httpMocks.createResponse();

    AppResponse.notFound(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(404);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(404);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.forbidden should return status 403', () => {
    const response = httpMocks.createResponse();

    AppResponse.forbidden(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(403);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(403);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.conflict should return status 409', () => {
    const response = httpMocks.createResponse();

    AppResponse.conflict(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(409);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(409);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.serverError should return status 500', () => {
    const response = httpMocks.createResponse();

    AppResponse.serverError(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(500);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(500);
    expect(body.success).to.equal(false);
  });

  it('AppResponse.serverError should return special errors on production', () => {
    const response = httpMocks.createResponse();

    process.env.NODE_ENV = 'production';

    AppResponse.serverError(response);
    const body = response._getJSONData();

    expect(response.statusCode).to.equal(500);
    expect(body).to.have.all.keys('success', 'statusCode', 'message', 'errors');
    expect(body.statusCode).to.equal(500);
    expect(body.success).to.equal(false);
    expect(body.errors).to.equal(
      'This error might be from us, send us a message via help@safescrows.com if this continues',
    );
  });
});
