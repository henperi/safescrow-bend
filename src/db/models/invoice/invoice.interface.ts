// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import Sequelize from 'sequelize';
import { InvoiceItemAttributes, InvoiceItemInstance } from '../invoiceItem/invoiceItem.interface';

export interface InvoiceAttributes {
  id?: number;
  invoiceId?: string;
  invoiceTitle?: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone?: string;
  receiverAddress?: string;
  additionInfo?: string;
  totalAmount: number;
  tax?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceInstance extends Sequelize.Instance<InvoiceAttributes>, InvoiceAttributes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataValues: Record<string, any>;
  invoiceItems: InvoiceItemInstance[];

  getInvoiceItems: Sequelize.HasManyCreateAssociationMixin<
    InvoiceItemAttributes,
    InvoiceItemInstance
  >;
}
