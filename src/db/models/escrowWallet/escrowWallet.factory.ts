// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { EscrowWalletInstance, EscrowWalletAttributes } from './escrowWallet.interface';

export const escrowWalletFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<EscrowWalletInstance, EscrowWalletAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<EscrowWalletAttributes> = {
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

  const EscrowWallet = sequelize.define<EscrowWalletInstance, EscrowWalletAttributes>(
    'EscrowWallet',
    attributes,
  );

  EscrowWallet.associate = (models): void => {
    EscrowWallet.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
    EscrowWallet.hasMany(models.Transaction, {
      foreignKey: 'walletId',
      as: 'Transactions',
    });
  };

  return EscrowWallet;
};
