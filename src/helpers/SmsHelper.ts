/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from 'dotenv';
// import * as AfricasTalking from 'africastalking';
import { appLogger } from '../utils/appLogger';

const AfricasTalking = require('africastalking');

dotenv.config();

const credentials = {
  apiKey: process.env.AFRIKA_TALKING_API_KEY as string, // use your sandbox app API key for development in the test environment
  username: process.env.AFRIKA_TALKING_USERNAME as string, // use 'sandbox' for development in the test environment
};

const africasTalkingInstance = AfricasTalking(credentials);

const sms = africasTalkingInstance.SMS;

/**
 * Sms Helper
 */
export class SmsHelper {
  /**
   * Method to send an sms to one or many mobile numbers
   * @param mobileNumbers an array of mobile numbers of the form +234*********
   * @param message the message to send
   * @returns {void}
   */
  public static async sendSms(mobileNumbers: string[], message: string): Promise<void> {
    try {
      const nodeEnv = process.env.NODE_ENV;

      if (nodeEnv === 'production') {
        const response = await sms.send({
          to: mobileNumbers,
          // from: 'SAFESCROW',
          enque: true,
          message,
        });

        appLogger('SMSRESPONSE', response);
      }
    } catch (error) {
      appLogger('SMSERROR::', error);
    }
  }
}
