// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface InvoiceItemAttributes {
  id?: number;
  invoiceItemId?: string;
  description?: string;
  rate: number;
  quantity: number;
  amount: number;
  invoiceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceItemInstance
  extends SequelizeTypes.Instance<InvoiceItemAttributes>,
    InvoiceItemAttributes {
  // UserInstance methods for HasOne Profile
}
