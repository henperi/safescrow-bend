// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface TransactionAttributes {
  id?: number;
  transactionId: string;
  walletId?: string;
  userId?: string;
  amount: number;
  type: 'Escrow' | 'Main';
  from: string;
  to: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionInstance
  extends SequelizeTypes.Instance<TransactionAttributes>,
    TransactionAttributes {
  // UserInstance methods for HasOne Profile
}
