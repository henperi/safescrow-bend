// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import Sequelize, { SequelizeStaticAndInstance } from 'sequelize';
import { UserInstance, UserAttributes } from '../user/user.interface';

export interface ProfileAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  gender?: string;
  dateOfBirth?: Date;
  nationality?: string;
  stateOfResidence?: string;
  bio?: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  // Associations
  User?: UserAttributes | UserAttributes['id'];
}

export interface ProfileInstance
  extends SequelizeStaticAndInstance<ProfileAttributes>,
    ProfileAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
}
