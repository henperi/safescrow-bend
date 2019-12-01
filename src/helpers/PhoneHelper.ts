import * as libphonenumber from 'google-libphonenumber';

const PNF = libphonenumber.PhoneNumberFormat;
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const parseNumber = (phoneNumber: string): libphonenumber.PhoneNumber =>
  phoneUtil.parseAndKeepRawInput(phoneNumber, 'NG');

/**
 * Phone Helper class
 */
export class PhoneHelper {
  /**
   * Method to check whether a phone number is possibly valid (NG)
   * @param phoneNumber phone number
   * @returns phone number validity status
   */
  public static isValid(phoneNumber: string): boolean {
    return phoneUtil.isValidNumber(parseNumber(phoneNumber));
  }

  /**
   * Method that returns the international format (NG) of a mobile number
   * @param phoneNumber phone number
   * @returns phone number validity status
   */
  public static getInternationalFormat(phoneNumber: string): string {
    return phoneUtil.format(parseNumber(phoneNumber), PNF.E164);
  }
}
