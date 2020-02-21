// interfaces
import { ProfileInstance, ProfileAttributes } from '../db/models/profile/profile.interface';

// models
import models from '../db/models';

// Repositories
import Repository from './Repository';

/**
 * ProfileRepository
 */
export class ProfileRepository extends Repository {
  private static Profile: typeof models.Profile = models.Profile;

  /**
   * Method to update a profile given the userId
   * @param userId - The uniqueId of the user
   * @param updateableFields - The details to update
   * @returns The updated profile
   */
  static async update(
    userId: number,
    updateableFields: ProfileAttributes,
  ): Promise<[number, ProfileInstance[]]> {
    return this.Profile.update(updateableFields, { where: { userId }, returning: true });
  }
}
