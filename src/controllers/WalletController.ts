import * as Express from 'express';

import { MainWalletRepository } from '../repositories/MainWalletRepository';
import { EscrowWalletRepository } from '../repositories/EscrowWalletRepository';
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to transactions
 */
export class WalletController {
  /**
   * Method to get the authenticated user's Wallet
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async getWallets(req: Express.Request, res: Express.Response): Promise<void> {
    const { id } = res.locals.user;

    try {
      const [mainWallet, escrowWallet] = await Promise.all([
        MainWalletRepository.getByUserId(id),
        EscrowWalletRepository.getByUserId(id),
      ]);

      return AppResponse.success(res, {
        message: 'Main and Escrow wallet fetched successfully',
        data: { mainWallet, escrowWallet },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}
