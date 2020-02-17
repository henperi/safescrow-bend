import * as Sequelize from 'sequelize';

// interfaces
import { EscrowWalletInstance } from '../db/models/escrowWallet/escrowWallet.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

const { Op } = Sequelize;

/**
 * EscrowWalletRepository
 */
export class EscrowWalletRepository extends Repository {
  private static EscrowWallet: typeof models.EscrowWallet = models.EscrowWallet;

  /**
   * Method to get a user's EscrowWallet by his userId
   * @param userId - The userId of the user
   * @returns - The user's EscrowWallet or null
   */
  static async getByUserId(userId: string | number): Promise<EscrowWalletInstance | null> {
    return this.EscrowWallet.findOne({
      where: {
        [Op.or]: [{ userId }],
      },
    });
  }
}
