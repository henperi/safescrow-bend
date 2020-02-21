import * as Express from 'express';
import InvoiceRepository from '../repositories/InvoiceRepository';
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to invoice
 */
class InvoiceController {
  /**
   * Method to create an Invoice
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async createInvoice(req: Express.Request, res: Express.Response): Promise<void> {
    const invoiceData = { ...req.body };

    const { invoiceItems } = invoiceData;

    const invoice = await InvoiceRepository.create(invoiceData, invoiceItems);

    return AppResponse.created(res, { data: invoice });
  }
}

export default InvoiceController;
