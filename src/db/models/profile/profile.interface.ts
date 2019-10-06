// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { UserInstance, UserAttributes } from '../user/user.interface';

export interface ProfileAttributes {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  storeName?: string;
  bio?: string;
  dateOfBirth?: Date;
  nationality?: string;
  stateOfResidence?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Associations
  User?: UserAttributes | UserAttributes['id'];
}

export interface ProfileInstance
  extends SequelizeTypes.Instance<ProfileAttributes>,
    ProfileAttributes {
  getUser: SequelizeTypes.BelongsToGetAssociationMixin<UserInstance>;
  setUser: SequelizeTypes.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: SequelizeTypes.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
}
