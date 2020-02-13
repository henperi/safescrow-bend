import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

// Interfaces
import { TokenData } from '../interfaces/TokenHelpers.interface';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Method to generate a token for users
 * @param userTokenData data used to generate the token
 * @returns Returns the generated token
 */
const generateUserToken = (userTokenData: TokenData): string => {
  try {
    return jwt.sign(userTokenData, JWT_SECRET, {
      expiresIn: '2s',
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Method to verify a user's token
 * @param userToken - The token to validate
 * @returns {TokenData | string} Returns the decoded token
 */
const verifyUserToken = (userToken: string): TokenData | string => {
  try {
    return jwt.verify(userToken, JWT_SECRET) as TokenData;
  } catch (error) {
    throw new Error(error);
  }
};

const setupTokenData = (data: TokenData): TokenData => ({
  id: data.id,
  uniqueId: data.uniqueId,
  email: data.email,
  phone: data.phone,
  Profile: { firstName: data.Profile.firstName, lastName: data.Profile.lastName },
  accountType: data.accountType,
  secretKey: data.secretKey,
});

export { generateUserToken, verifyUserToken, setupTokenData };
