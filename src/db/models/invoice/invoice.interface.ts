// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface InvoiceAttributes {
  id?: number;
  invoiceId?: string;
  invoiceTitle?: string;
  recieverName: string;
  recieverEmail: string;
  recieverPhone?: string;
  recieverAddress?: string;
  additionInfo?: string;
  totalAmount: number;
  tax?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceInstance
  extends SequelizeTypes.Instance<InvoiceAttributes>,
    InvoiceAttributes {
  // UserInstance methods for HasOne Profile
}
