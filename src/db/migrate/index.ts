import { createModels } from '../models';

/**
 * Creates the database tables using the defined models
 */
createModels().sequelize.sync();
