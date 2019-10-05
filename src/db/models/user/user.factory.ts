// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { UserAttributes, UserInstance } from './user.interface';

export const userFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<UserAttributes> = {
    uniqueId: {
      type: DataTypes.STRING,
      defaultValue: generateUniqueId(),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    secretKey: {
      type: DataTypes.STRING,
    },
    accountType: {
      type: DataTypes.STRING,
      defaultValue: 'Customer',
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
};
