// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import {
  EscrowWalletInstance,
  EscrowWalletAttributes,
} from './models/escrowWallet/escrowWallet.interface';
import { AddressInstance, AddressAttributes } from './models/address/address.interface';
import { ProfileInstance, ProfileAttributes } from './models/profile/profile.interface';
import { UserInstance, UserAttributes } from './models/user/user.interface';
import { MainWalletInstance, MainWalletAttributes } from './models/mainWallet/mainWallet.interface';
import {
  TransactionInstance,
  TransactionAttributes,
} from './models/transaction/transaction.interface';
import {
  InvoiceItemInstance,
  InvoiceItemAttributes,
} from './models/invoiceItem/invoiceItem.interface';
import { InvoiceInstance, InvoiceAttributes } from './models/invoice/invoice.interface';

export interface DbInterface {
  sequelize: SequelizeTypes.Sequelize;
  Sequelize: SequelizeTypes.SequelizeStatic;
  User: SequelizeTypes.Model<UserInstance, UserAttributes>;
  Profile: SequelizeTypes.Model<ProfileInstance, ProfileAttributes>;
  Address: SequelizeTypes.Model<AddressInstance, AddressAttributes>;
  MainWallet: SequelizeTypes.Model<MainWalletInstance, MainWalletAttributes>;
  EscrowWallet: SequelizeTypes.Model<EscrowWalletInstance, EscrowWalletAttributes>;
  Transaction: SequelizeTypes.Model<TransactionInstance, TransactionAttributes>;
  InvoiceItem: SequelizeTypes.Model<InvoiceItemInstance, InvoiceItemAttributes>;
  Invoice: SequelizeTypes.Model<InvoiceInstance, InvoiceAttributes>;
}
