import * as Express from 'express';

import { TransactionRepository } from '../repositories/TransactionRepository';
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to transactions
 */
export class TransactionController {
  /**
   * Method to get the authenticated user's Transaction History
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async getAll(req: Express.Request, res: Express.Response): Promise<void> {
    const { id } = res.locals.user;

    try {
      const transactions = await TransactionRepository.getByUserId(id);

      return AppResponse.success(res, {
        message: 'transactions fetched successfully',
        data: { transactions },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}
