// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as Sequelize from '@types/sequelize';

// interfaces
import { InvoiceAttributes, InvoiceInstance } from '../db/models/invoice/invoice.interface';
import { InvoiceItemAttributes } from '../db/models/invoiceItem/invoiceItem.interface';

// models
import models, { sequelize } from '../db/models';

// Repositories
import Repository from './Repository';

/**
 * AddressRepository
 */
class InvoiceRepository extends Repository {
  private static Invoice: typeof models.Invoice = models.Invoice;

  private static InvoiceItem: typeof models.InvoiceItem = models.InvoiceItem;

  /**
   * Method to create the Invoice
   * @param invoiceData - An object containing the invoice to create
   * @param invoiceItemsData - An array containing the invoice items to create
   * @returns {Promise<InvoiceInstance | null>} The created invoice
   */
  static async create(
    invoiceData: InvoiceAttributes,
    invoiceItemsData: Array<InvoiceItemAttributes>,
  ): Promise<InvoiceInstance> {
    return sequelize.transaction(async (t: Sequelize.Transaction) => {
      const invoice = await this.Invoice.create(invoiceData, {
        transaction: t,
      });

      const invoiceItems = await this.InvoiceItem.bulkCreate(
        invoiceItemsData.map(item => ({ ...item, invoiceId: invoice.id as number })),
        { transaction: t },
      );

      invoice.dataValues.invoiceItems = invoiceItems;

      return invoice;
    });
  }
}

export default InvoiceRepository;
