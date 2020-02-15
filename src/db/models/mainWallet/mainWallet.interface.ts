// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface MainWalletAttributes {
  id?: number;
  walletId?: string;
  balance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MainWalletInstance
  extends SequelizeTypes.Instance<MainWalletAttributes>,
    MainWalletAttributes {
  // UserInstance methods for HasOne Profile
}
