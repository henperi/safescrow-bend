import * as Sequelize from 'sequelize';

// interfaces
import generateUniqueId from '../helpers/generateUniqueId';
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

  private static MainWallet: typeof models.MainWallet = models.MainWallet;

  private static EscrowWallet: typeof models.EscrowWallet = models.EscrowWallet;

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
    });
  }

  /**
   * Method to get a user by either his email or phone
   * @param data - An object containing the email and phone
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async getByEmailOrPhone({ email, phone }: EmailOrPhone): Promise<UserInstance | null> {
    return this.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      include: [{ model: this.Profile, as: 'Profile' }],
    });
  }

  /**
   * Method to get a user by his email
   * @param email - user's email
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static getByEmail(email: string): Promise<UserInstance | null> {
    return this.User.findOne({
      where: { email },
      include: [{ model: this.Profile, as: 'Profile' }],
    });
  }

  /**
   * Method to create a new user
   * @param userData - An object containig the info of the user to create
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async create(userData: UserAttributes): Promise<UserInstance> {
    const walletId = generateUniqueId();

    return this.User.create(
      {
        ...userData,
        uniqueId: walletId,
        MainWallet: { walletId },
        EscrowWallet: { walletId },
      },
      {
        include: [
          { model: this.Profile, as: 'Profile' },
          { model: this.MainWallet, as: 'MainWallet' },
          { model: this.EscrowWallet, as: 'EscrowWallet' },
          { model: this.Address, as: 'Address' },
        ],
      },
    );
  }

  /**
   * Method to get a user by uniqueId and SecretKey
   * @param uniqueId - The user's uniqueId
   * @param secretKey - The user's secret key
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static getByUniqueIdAndSecretKey(
    uniqueId: string,
    secretKey: string,
  ): Promise<UserInstance | null> {
    return this.User.findOne({
      where: { uniqueId, secretKey },
      include: [{ model: this.Profile, as: 'Profile' }],
    });
  }

  /**
   * Method to update a user's password
   * @param user - A User instance
   * @param password - The new password
   * @param secretKey - The new secret key
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async updatePassword(
    user: UserInstance,
    password: string,
    secretKey: string,
  ): Promise<UserInstance> {
    await user.update({ password, secretKey });

    return user;
  }
}

export default UserRepository;
