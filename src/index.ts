import * as express from 'express';
import bootstrapApp from './bootstrapApp';

const app = express();
const port = process.env.PORT || 8025;

/**
 * @description Method to start the app
 * @returns {void} void
 */
const startServer = (): void => {
  try {
    const server = bootstrapApp(app);

    server.listen(port, () => {
      console.log(`connected on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

startServer();

export default app;
