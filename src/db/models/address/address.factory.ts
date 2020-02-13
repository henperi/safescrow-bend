// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';
import { AddressInstance, AddressAttributes } from './address.interface';

export const addressFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<AddressInstance, AddressAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<AddressAttributes> = {
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    line1: {
      type: DataTypes.STRING,
    },
    line2: {
      type: DataTypes.STRING,
    },
    landMark: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    addressType: {
      type: DataTypes.STRING,
    },
  };

  const Address = sequelize.define<AddressInstance, AddressAttributes>('Address', attributes);

  return Address;
};
