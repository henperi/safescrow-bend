// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { AddressInstance, AddressAttributes } from './models/address/address.interface';
import { ProfileInstance, ProfileAttributes } from './models/profile/profile.interface';
import { UserInstance, UserAttributes } from './models/user/user.interface';

export interface DbInterface {
  sequelize: SequelizeTypes.Sequelize;
  Sequelize: SequelizeTypes.SequelizeStatic;
  User: SequelizeTypes.Model<UserInstance, UserAttributes>;
  Profile: SequelizeTypes.Model<ProfileInstance, ProfileAttributes>;
  Address: SequelizeTypes.Model<AddressInstance, AddressAttributes>;
}
