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
      unique: true,
    },
    invoiceTitle: {
      type: DataTypes.STRING,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverPhone: {
      type: DataTypes.STRING,
    },
    receiverAddress: {
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

  Invoice.addHook('beforeCreate', (invoice: InvoiceAttributes) => {
    // eslint-disable-next-line no-param-reassign
    invoice.invoiceId = generateUniqueId();
  });

  Invoice.associate = (models): void => {
    Invoice.hasMany(models.InvoiceItem, {
      foreignKey: 'invoiceId',
      as: 'InvoiceItems',
    });
  };

  return Invoice;
};
