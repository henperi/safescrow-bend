import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

// Interfaces
import { TokenData } from '../interfaces/TokenHelpers.interface';

const JWT_SECRET = process.env.JWT_SECRET as string;
const PASSWORD_RESET_SECRET = process.env.PASSWORD_RESET_SECRET as string;

/**
 * Method to generate a token for users
 * @param userTokenData data used to generate the token
 * @returns Returns the generated token
 */
const generateUserToken = (userTokenData: TokenData): string =>
  jwt.sign(userTokenData, JWT_SECRET, {
    expiresIn: '2d',
  });

/**
 * Method to verify a user's token
 * @param userToken - The token to validate
 * @returns - Returns the decoded token
 */
const verifyUserToken = (userToken: string): TokenData | string =>
  jwt.verify(userToken, JWT_SECRET) as TokenData;

/* Method to generate a token for users
 * @param tokenData - data used to generate the token
 * @returns Returns the generated token
 */
const generatePasswordResetToken = (tokenData: Partial<TokenData>): string => {
  return jwt.sign(tokenData, PASSWORD_RESET_SECRET, {
    expiresIn: '3h',
  });
};

/**
 * Method to generate a token for users
 * @param token - token to decode
 * @returns Returns the user's details
 */
const validatePasswordResetToken = (token: string): Partial<TokenData> => {
  return jwt.verify(token, PASSWORD_RESET_SECRET) as Partial<TokenData>;
};

/**
 * Method to filter the tokenData and return what is necessary
 * @param data - The token to validate
 * @returns - Returns a filtered tokenData
 */
const setupTokenData = (data: TokenData): TokenData => ({
  id: data.id,
  uniqueId: data.uniqueId,
  email: data.email,
  phone: data.phone,
  Profile: { firstName: data.Profile.firstName, lastName: data.Profile.lastName },
  accountType: data.accountType,
  secretKey: data.secretKey,
});

export {
  generateUserToken,
  verifyUserToken,
  setupTokenData,
  generatePasswordResetToken,
  validatePasswordResetToken,
};
