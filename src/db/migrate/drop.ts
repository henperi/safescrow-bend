import { createModels } from '../models';

/**
 * Drops all the database tables using the defined models
 */
createModels().sequelize.drop();
