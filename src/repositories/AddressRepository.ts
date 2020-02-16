import * as Sequelize from 'sequelize';

// interfaces
import { AddressAttributes, AddressInstance } from '../db/models/address/address.interface';
import { AddressTypeAndUserId } from '../interfaces/Address.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

const { Op } = Sequelize;

/**
 * AddressRepository
 */
class AddressRepository extends Repository {
  private static Address: typeof models.Address = models.Address;

  /**
   * Method to get a user's address by the type of address and the userId
   * @param data - An object containig the userId and the type of address
   * @returns {Promise<UserInstance | null>} The found user or null
   */
  static async getByTypeAndUserId({
    userId,
    addressType,
  }: AddressTypeAndUserId): Promise<AddressInstance | null> {
    return this.Address.findOne({
      where: {
        [Op.and]: [{ userId }, { addressType }],
      },
    }).catch(error => {
      throw new Error(error);
    });
  }

  /**
   * Method to create the delivery address of a user
   * @param addressData - An object containig the info of the address to create
   * @returns {Promise<AddressInstance | null>} The created address
   */
  static async create(addressData: AddressAttributes): Promise<AddressInstance> {
    return this.Address.create(addressData, {}).catch(error => {
      throw new Error(error);
    });
  }
}

export default AddressRepository;
