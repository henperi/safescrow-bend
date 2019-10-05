import * as bcrypt from 'bcryptjs';

/**
 * This method hashes a string given the string and an optional salt
 * @param password - The password to hash
 * @param [saltLength=10] - the salt length: defaults to 10
 *
 * @returns Returns the hashedPassword
 */
const hashPassword = (password: string, saltLength = 10): string => {
  const salt = bcrypt.genSaltSync(saltLength);

  return bcrypt.hashSync(password, salt);
};

/**
 * This method compares two passwords
 * @param sentPassword - The password sent in the req
 * @param dbPassword - The password from db to compare against
 *
 * @returns Returns a boolean
 */
const comparePassword = (sentPassword: string, dbPassword: string): boolean =>
  bcrypt.compareSync(sentPassword, dbPassword);

export { hashPassword, comparePassword };
