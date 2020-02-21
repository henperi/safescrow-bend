// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import { InvoiceItemInstance, InvoiceItemAttributes } from './invoiceItem.interface';

export const invoiceItemFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<InvoiceItemInstance, InvoiceItemAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<InvoiceItemAttributes> = {
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
