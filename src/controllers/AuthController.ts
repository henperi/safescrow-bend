import * as Express from 'express';
import { PhoneHelper } from '../helpers/PhoneHelper';
import { SmsHelper } from '../helpers/SmsHelper';
import { TokenData } from '../interfaces/TokenHelpers.interface';
import { UserRepository } from '../repositories/UserRepository';
import { AppResponse } from '../helpers/AppResponse';
import { hashPassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { EmailHelper } from '../helpers/EmailHelper';
import {
  generateUserToken,
  setupTokenData,
  generatePasswordResetToken,
} from '../helpers/tokenHelpers';

const passwordResetCallbackURL = process.env.PASSWORD_RESET_CALLBACK_URL;

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
            Thanks for signing up on Safescrow.
            Buy goods and services from anyone, anywhere with 99.9% buyer and seller protection
          </p>
        `,
      });

      return AppResponse.created(res, { data: { token } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * Method to reset a User's password
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async handlePasswordResetRequest(
    req: Express.Request,
    res: Express.Response,
  ): Promise<void> {
    const { email } = req.body;

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      return AppResponse.notFound(res, {
        message: `User with email: ${email} does not exist`,
      });
    }

    const { secretKey, uniqueId, Profile } = user;

    const resetToken = generatePasswordResetToken({ secretKey, uniqueId });

    EmailHelper.sendEmail({
      to: email,
      from: { name: 'Safescrow', email: 'support@safescrow.com' },
      subject: 'Safescrow password reset',
      html: `
          <p>Hello ${Profile!.firstName}.</p>
          <p>
            We received a request to reset your safescrow password.
            If this is you, please click this
            <a href="${passwordResetCallbackURL + resetToken}" target="_blank" >link</a>
            within 3 hours to reset you password. If you didn't make this request just ignore it.
          </p>
        `,
    });

    return AppResponse.success(res, {
      message: `Successful. A reset link has been sent to ${email}`,
    });
  }

  /**
   * Method to reset a User's password
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async resetPassword(req: Express.Request, res: Express.Response): Promise<void> {
    const user = await UserRepository.updatePassword(
      res.locals.user,
      hashPassword(req.body.password),
      `${generateUniqueId()}-${res.locals.user.email}`,
    );

    const token = generateUserToken(setupTokenData(user as TokenData));

    EmailHelper.sendEmail({
      to: user.email,
      from: { name: 'Safescrow', email: 'support@safescrow.com' },
      subject: 'Safescrow password reset',
      html: `
          <p>Hello ${user.Profile!.firstName}.</p>
          <p>
            Your safescrow password has been reset successfully.
            If this isn't you please contact us at
            <a href="mailto:support@safescrow.com">support@safescrow.com</a>
          </p>
        `,
    });

    return AppResponse.success(res, {
      message: `Successful. Password updated`,
      data: { token },
    });
  }
}

export default AuthController;
