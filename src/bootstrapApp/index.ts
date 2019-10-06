import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';

// Interfaces
import { Application, Request, Response } from 'express';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

// Routes
import appRoutes from '../routes';

const bootstrapApp = (app: Application): Application => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.enable('trust proxy');

  app.use('/api/v1', appRoutes);

  app.use('/*', (req: Request, res: Response) =>
    AppResponse.notFound(res, { message: 'This endpoint does not exist' }),
  );

  return app;
};

export default bootstrapApp;
