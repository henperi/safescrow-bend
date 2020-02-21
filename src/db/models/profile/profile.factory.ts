// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
import * as SequelizeTypes from '@types/sequelize';

import { ProfileAttributes, ProfileInstance } from './profile.interface';

export const profileFactory = (
  sequelize: SequelizeTypes.Sequelize,
  DataTypes: SequelizeTypes.DataTypes,
): SequelizeTypes.Model<ProfileInstance, ProfileAttributes> => {
  const attributes: SequelizeTypes.DefineModelAttributes<ProfileAttributes> = {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    stateOfResidence: {
      type: DataTypes.STRING,
    },
  };

  const Profile = sequelize.define<ProfileInstance, ProfileAttributes>('Profile', attributes);

  Profile.associate = (models): void => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
  };

  return Profile;
};
