// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { ProfileInstance, ProfileAttributes } from '../db/models/profile/profile.interface';
import { UserInstance, UserAttributes } from '../db/models/user/user.interface';

export interface DbInterface {
  sequelize: SequelizeTypes.Sequelize;
  Sequelize: SequelizeTypes.SequelizeStatic;
  User: SequelizeTypes.Model<UserInstance, UserAttributes>;
  Profile: SequelizeTypes.Model<ProfileInstance, ProfileAttributes>;
}

// let user: DbInterface['Sequelize'];
