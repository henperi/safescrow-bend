import * as express from 'express';
import { log } from 'util';
import bootstrapApp from './bootstrapApp';

const app = express();
const port = process.env.PORT || 8025;

/**
 * Method to start the app
 * @returns {void} void
 */
const startServer = (): void => {
  try {
    const server = bootstrapApp(app);

    server.listen(port, () => {
      log(`connected on port ${port}`);
    });
  } catch (error) {
    log(error);
    process.exit();
  }
};

startServer();

export default app;
