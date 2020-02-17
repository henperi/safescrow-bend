import * as Sequelize from 'sequelize';

// interfaces
import { TransactionInstance } from '../db/models/transaction/transaction.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

const { Op } = Sequelize;

/**
 * AddressRepository
 */
export class TransactionRepository extends Repository {
  private static Transaction: typeof models.Transaction = models.Transaction;

  /**
   * Method to get all transactions associated to a user based on the userId
   * @param userId - The userId with which to quary all transactions
   * @returns - All the transactions of the specified user
   */
  static async getByUserId(userId: string | number): Promise<TransactionInstance[] | null> {
    return this.Transaction.findAll({
      where: {
        [Op.or]: [{ userId }],
      },
    });
  }
}
