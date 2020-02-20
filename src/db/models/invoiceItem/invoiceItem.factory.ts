// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import generateUniqueId from '../../../helpers/generateUniqueId';
import { InvoiceItemInstance, InvoiceItemAttributes } from './invoiceItem.interface';

export const invoiceItemFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<InvoiceItemInstance, InvoiceItemAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<InvoiceItemAttributes> = {
    invoiceItemId: {
      type: DataTypes.STRING,
      defaultValue: generateUniqueId(),
      unique: true,
    },
    invoiceId: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  };

  const InvoiceItem = sequelize.define<InvoiceItemInstance, InvoiceItemAttributes>(
    'InvoiceItem',
    attributes,
  );

  InvoiceItem.associate = (models): void => {
    InvoiceItem.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      as: 'Invoice',
    });
  };

  return InvoiceItem;
};
