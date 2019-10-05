import { createModels } from '../models';

/**
 * Recreates the database tables using the defined models
 */
createModels().sequelize.sync({ force: true });
