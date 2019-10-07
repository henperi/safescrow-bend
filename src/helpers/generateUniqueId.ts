import * as shortId from 'shortid';
/**
 * This method generates a random string as a reference number
 * @returns random string
 */
const generateUniqueId = (): string => shortId.generate();

export default generateUniqueId;
