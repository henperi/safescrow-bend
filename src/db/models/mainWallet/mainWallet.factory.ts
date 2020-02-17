// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { MainWalletInstance, MainWalletAttributes } from './mainWallet.interface';

export const mainWalletFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<MainWalletInstance, MainWalletAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<MainWalletAttributes> = {
    walletId: {
      type: DataTypes.STRING,
      defaultValue: generateUniqueId(),
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  };

  const MainWallet = sequelize.define<MainWalletInstance, MainWalletAttributes>(
    'MainWallet',
    attributes,
  );

  MainWallet.associate = (models): void => {
    MainWallet.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
    MainWallet.hasMany(models.Transaction, {
      foreignKey: 'walletId',
      as: 'Transactions',
    });
  };

  return MainWallet;
};
