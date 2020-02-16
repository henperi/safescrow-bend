import * as Sequelize from 'sequelize';

// interfaces
import { UserInstance, UserAttributes } from '../db/models/user/user.interface';
import { EmailOrPhone } from '../interfaces/User.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

const { Op } = Sequelize;

/**
 * UserRepository
 */
class UserRepository extends Repository {
  private static User: typeof models.User = models.User;

  private static Profile: typeof models.Profile = models.Profile;

  private static Address: typeof models.Address = models.Address;

  /**
   * Method to get a user by his uniqueId
   * @param uniqueId - The uniqueId of the user
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async getByUniqueId(uniqueId: string): Promise<UserInstance | null> {
    return this.User.findOne({
      where: {
        [Op.or]: [{ uniqueId }],
      },
    }).catch(error => {
      throw new Error(error);
    });
  }

  /**
   * Method to get a user by either his email or phone
   * @param data - An object containig the email and phone
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async getByEmailOrPhone({ email, phone }: EmailOrPhone): Promise<UserInstance | null> {
    return this.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    }).catch(error => {
      throw new Error(error);
    });
  }

  /**
   * Method to create a new user
   * @param userData - An object containig the info of the user to create
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async create(userData: UserAttributes): Promise<UserInstance> {
    return this.User.create(userData, {
      include: [{ model: this.Profile, as: 'Profile' }, { model: this.Address, as: 'Address' }],
    }).catch(error => {
      throw new Error(error);
    });
  }
}

export default UserRepository;
