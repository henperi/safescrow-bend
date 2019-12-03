import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
import { appLogger } from '../utils/appLogger';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface SendEMail {
  to: string;
  from: string | { name?: string; email: string };
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Email Helper
 */
export class EmailHelper {
  /**
   * Send an email
   * @param data email data
   * @return response
   */
  public static async sendEmail(data: SendEMail): Promise<void> {
    try {
      await sgMail.send(data, false, err => {
        if (err) {
          appLogger('Email Error::', err);
        }
      });
    } catch (error) {
      appLogger('Unknown Email Error::', error);
    }
  }
}
