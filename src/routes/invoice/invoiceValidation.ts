import * as Express from 'express';
import * as Joi from '@hapi/joi';
import { AppResponse } from '../../helpers/AppResponse';

/**
 * Schemas for all the endpoints relating to Invoice
 */
class InvoiceSchema {
  /**
   *  Schema used to validate the data relating to creating a new invoice
   *  @returns createInvoiceSchema
   */
  static get createInvoiceSchema(): Joi.ObjectSchema {
    return Joi.object({
      invoiceTitle: Joi.string()
        .min(3)
        .max(50)
        .required(),
      receiverName: Joi.string()
        .min(3)
        .max(50)
        .required(),
      receiverPhone: Joi.string()
        .length(11)
        .required(),
      receiverAddress: Joi.string()
        .min(3)
        .max(100),
      additionalInfo: Joi.string(),
      totalAmount: Joi.number()
        .min(0.0)
        .required(),
      tax: Joi.number().min(0.0),
      receiverEmail: Joi.string()
        .email()
        .required(),
      invoiceItems: Joi.array()
        .min(1)
        .items(
          Joi.object({
            rate: Joi.number()
              .min(0)
              .required(),
            quantity: Joi.number()
              .integer()
              .min(1)
              .required(),
            amount: Joi.number()
              .min(0)
              .required(),
            description: Joi.string()
              .min(3)
              .max(100),
          }),
        )
        .required(),
    });
  }
}

const invoiceTotalValidator = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  try {
    const { invoiceItems, totalAmount } = req.body;
    let calculatedTotalAmount = 0;

    for (let i = 0; i < invoiceItems.length; i += 1) {
      const { quantity, rate, amount } = invoiceItems[i];

      const total = quantity * rate;

      if (total !== amount) {
        throw new Error(`orderItems[${i}] total is not equal to the product of rate and quantity`);
      }

      calculatedTotalAmount += total;
    }

    if (totalAmount !== calculatedTotalAmount) {
      throw new Error('totalAmount is not equal to the sum of amount in invoiceItems');
    }

    return next();
  } catch (error) {
    const { message } = error;

    const path = message.split(' ')[0];

    return AppResponse.badRequest(res, {
      errors: {
        details: [
          {
            message,
            path,
          },
        ],
      },
    });
  }
};

export default InvoiceSchema;
export { invoiceTotalValidator };
