/* eslint-disable import/no-cycle */
// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { ProfileInstance, ProfileAttributes } from '../profile/profile.interface';
import { AddressAttributes, AddressInstance } from '../address/address.interface';

export interface UserAttributes {
  id?: number;
  uniqueId?: string;
  phone: string;
  email: string;
  password: string;
  accountType?: string;
  secretKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Associations
  Profile?: ProfileAttributes | ProfileAttributes['id'];
  Address?: AddressAttributes | AddressAttributes['id'];
}

export interface UserInstance extends SequelizeTypes.Instance<UserAttributes>, UserAttributes {
  // UserInstance methods for HasOne Profile
  createProfile: SequelizeTypes.HasOneCreateAssociationMixin<ProfileAttributes>;
  getProfile: SequelizeTypes.HasOneGetAssociationMixin<ProfileInstance>;
  setProfile: SequelizeTypes.HasOneSetAssociationMixin<
    ProfileInstance,
    ProfileAttributes['userId']
  >;

  // UserInstance methods for HasOne Address
  createAddress: SequelizeTypes.HasOneCreateAssociationMixin<AddressAttributes>;
  getAddress: SequelizeTypes.HasOneGetAssociationMixin<AddressInstance>;
  setAddress: SequelizeTypes.HasOneSetAssociationMixin<
    AddressInstance,
    AddressAttributes['userId']
  >;
}
