// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import { ProfileInstance, ProfileAttributes } from '../db/models/profile/profile.interface';
import { UserInstance, UserAttributes } from '../db/models/user/user.interface';
import {
  MainWalletInstance,
  MainWalletAttributes,
} from '../db/models/mainWallet/mainWallet.interface';
import {
  EscrowWalletInstance,
  EscrowWalletAttributes,
} from '../db/models/escrowWallet/escrowWallet.interface';
import {
  TransactionInstance,
  TransactionAttributes,
} from '../db/models/transaction/transaction.interface';

export interface DbInterface {
  sequelize: SequelizeTypes.Sequelize;
  Sequelize: SequelizeTypes.SequelizeStatic;
  User: SequelizeTypes.Model<UserInstance, UserAttributes>;
  Profile: SequelizeTypes.Model<ProfileInstance, ProfileAttributes>;
  MainWallet: SequelizeTypes.Model<MainWalletInstance, MainWalletAttributes>;
  EscrowWallet: SequelizeTypes.Model<EscrowWalletInstance, EscrowWalletAttributes>;
  Transaction: SequelizeTypes.Model<TransactionInstance, TransactionAttributes>;
}
