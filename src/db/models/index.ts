// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';

import { DbInterface } from '../../interfaces/db.interface';
import { userFactory } from './user/user.factory';
import { profileFactory } from './profile/profile.factory';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./../config');

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[NODE_ENV];

export const createModels = (): DbInterface => {
  let sequelize;

  if (sequelizeConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[sequelizeConfig.use_env_variable], sequelizeConfig);
  } else {
    const { database, username, password } = sequelizeConfig;

    sequelize = new Sequelize(database, username, password, sequelizeConfig);
  }

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: userFactory(sequelize, Sequelize),
    Profile: profileFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName: string) => {
    if ((db as Sequelize)[modelName].associate) {
      (db as Sequelize)[modelName].associate(db);
    }
  });

  return db;
};

const models = createModels();

export default models;