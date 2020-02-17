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
      unique: true,
      defaultValue: generateUniqueId(),
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
      type: DataTypes.ENUM('Customer', 'Merchant'),
      defaultValue: 'Customer',
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = (models): void => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'Profile',
    });
    User.hasOne(models.Address, {
      foreignKey: 'userId',
      as: 'Address',
    });
    User.hasOne(models.MainWallet, {
      foreignKey: 'userId',
      as: 'MainWallet',
    });
    User.hasOne(models.EscrowWallet, {
      foreignKey: 'userId',
      as: 'EscrowWallet',
    });
  };

  return User;
};
