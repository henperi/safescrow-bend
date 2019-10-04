// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { UserInstance, UserAttributes } from '../db/models/user/user.interface';

export interface DbInterface {
  sequelize: SequelizeTypes.Sequelize;
  Sequelize: SequelizeTypes.SequelizeStatic;
  User: SequelizeTypes.Model<UserInstance, UserAttributes>;
}

// let user: DbInterface['Sequelize'];
