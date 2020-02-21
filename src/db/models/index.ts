// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Sequelize, { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

import { DbInterface } from '../db.interface';
import { userFactory } from './user/user.factory';
import { profileFactory } from './profile/profile.factory';
import { addressFactory } from './address/address.factory';
import { mainWalletFactory } from './mainWallet/mainWallet.factory';
import { escrowWalletFactory } from './escrowWallet/escrowWallet.factory';
import { transactionFactory } from './transaction/transaction.factory';
import { invoiceFactory } from './invoice/invoice.factory';
import { invoiceItemFactory } from './invoiceItem/invoiceItem.factory';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./../config');

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[NODE_ENV];
// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize;

export const createModels = (): DbInterface => {
  if (sequelizeConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[sequelizeConfig.use_env_variable], sequelizeConfig);
  } else {
    const { database, username, password } = sequelizeConfig;

    sequelize = new Sequelize(database, username, password, sequelizeConfig);
  }

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: userFactory(sequelize, Sequelize),
    Profile: profileFactory(sequelize, Sequelize),
    Address: addressFactory(sequelize, Sequelize),
    MainWallet: mainWalletFactory(sequelize, Sequelize),
    EscrowWallet: escrowWalletFactory(sequelize, Sequelize),
    Transaction: transactionFactory(sequelize, Sequelize),
    Invoice: invoiceFactory(sequelize, Sequelize),
    InvoiceItem: invoiceItemFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName: string) => {
    if ((db as Sequelize)[modelName].associate) {
      (db as Sequelize)[modelName].associate(db);
    }
  });

  return db;
};

const models = createModels();

export default models;
export { sequelize };
