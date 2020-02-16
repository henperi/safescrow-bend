// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { TransactionInstance, TransactionAttributes } from './transaction.interface';

export const transactionFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<TransactionInstance, TransactionAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<TransactionAttributes> = {
    transactionId: {
      type: DataTypes.STRING,
      defaultValue: generateUniqueId(),
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const Transaction = sequelize.define<TransactionInstance, TransactionAttributes>(
    'Transaction',
    attributes,
  );

  Transaction.associate = (models): void => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
  };

  return Transaction;
};
