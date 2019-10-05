// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

export interface UserAttributes {
  id?: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  secretKey: string;
  accountType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance extends SequelizeTypes.Instance<UserAttributes>, UserAttributes {
  // At the moment, there's nothing more to add apart
  // from the methods and attributes that the types
  // `Sequelize.Instance<UserAttributes>` and
  // `UserAttributes` give us. We'll add more here when
  //  We get on to adding associations
}
