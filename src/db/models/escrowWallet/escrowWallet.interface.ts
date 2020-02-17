// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface EscrowWalletAttributes {
  id?: number;
  walletId?: string;
  balance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EscrowWalletInstance
  extends SequelizeTypes.Instance<EscrowWalletAttributes>,
    EscrowWalletAttributes {
  // UserInstance methods for HasOne Profile
}
