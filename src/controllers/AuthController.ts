import * as Express from 'express';
import { PhoneHelper } from '../helpers/PhoneHelper';
import { SmsHelper } from '../helpers/SmsHelper';
import { TokenData } from '../interfaces/TokenHelpers.interface';
import UserRepository from '../repositories/UserRepository';
import { AppResponse } from '../helpers/AppResponse';
import { hashPassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { generateUserToken, setupTokenData } from '../helpers/tokenHelpers';
import { EmailHelper } from '../helpers/EmailHelper';

/**
 * Controller that handles everything relating to auth
 */
class AuthController {
  /**
   * Method to create a User
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async createUser(req: Express.Request, res: Express.Response): Promise<void> {
    const { firstName, lastName, phone, email, password, accountType } = req.body;

    try {
      const user = await UserRepository.getByEmailOrPhone({ email, phone });

      if (user) {
        return AppResponse.conflict(res, { message: 'This email or phone has been taken' });
      }

      const newUser = await UserRepository.create({
        accountType,
        phone: PhoneHelper.getInternationalFormat(phone),
        email,
        password: hashPassword(password),
        secretKey: `${generateUniqueId()}-${email}`,
        Profile: {
          firstName,
          lastName,
        },
      });
      const token = generateUserToken(setupTokenData(newUser as TokenData));

      SmsHelper.sendSms(
        [PhoneHelper.getInternationalFormat(phone)],
        'Thanks for signin up on Safescrow. Buy goods and services from anyone, anywhere with 99.9% buyer and seller protection',
      );

      EmailHelper.sendEmail({
        to: email,
        from: { name: 'Safescrow', email: 'support@safescrow.com' },
        subject: 'Welcome To Safescrow',
        html: `
          <p>Hello ${firstName}.</p> 
          <p>
            Thanks for signin up on Safescrow. 
            Buy goods and services from anyone, anywhere with 99.9% buyer and seller protection
          </p>
        `,
      });

      return AppResponse.created(res, { data: { token } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default AuthController;
