import * as Sequelize from 'sequelize';

// interfaces
import { MainWalletInstance } from '../db/models/mainWallet/mainWallet.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

const { Op } = Sequelize;

/**
 * MainWalletRepository
 */
export class MainWalletRepository extends Repository {
  private static MainWallet: typeof models.MainWallet = models.MainWallet;

  /**
   * Method to get a users MainWallet by his userId
   * @param userId - The userId of the user
   * @returns - The user's MainWallet or null
   */
  static async getByUserId(userId: string | number): Promise<MainWalletInstance | null> {
    return this.MainWallet.findOne({
      where: {
        [Op.or]: [{ userId }],
      },
    }).catch(error => {
      throw new Error(error);
    });
  }
}
