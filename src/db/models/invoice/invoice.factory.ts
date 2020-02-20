// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { InvoiceInstance, InvoiceAttributes } from './invoice.interface';

export const invoiceFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<InvoiceInstance, InvoiceAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<InvoiceAttributes> = {
    invoiceId: {
      type: DataTypes.STRING,
      defaultValue: generateUniqueId(),
      unique: true,
    },
    invoiceTitle: {
      type: DataTypes.STRING,
    },
    recieverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverPhone: {
      type: DataTypes.STRING,
    },
    recieverAddress: {
      type: DataTypes.STRING,
    },
    additionInfo: {
      type: DataTypes.STRING,
    },
    tax: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  };

  const Invoice = sequelize.define<InvoiceInstance, InvoiceAttributes>('Invoice', attributes);

  Invoice.associate = (models): void => {
    Invoice.hasMany(models.InvoiceItem, {
      foreignKey: 'invoiceId',
      as: 'InvoiceItems',
    });
  };

  return Invoice;
};
