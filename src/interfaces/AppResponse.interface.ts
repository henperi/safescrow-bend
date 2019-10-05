import * as express from 'express';

interface SuccessData {
  message?: string;
  statusCode?: number;
  data?: Array<{}> | {};
}

interface ErrorsData {
  message?: string;
  statusCode?: number;
  errors?: Array<{}> | {};
}

interface Success extends SuccessData {
  res: express.Response;
}

export { Success, SuccessData, ErrorsData };
