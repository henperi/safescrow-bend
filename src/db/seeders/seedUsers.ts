import * as lodash from 'lodash';
import * as faker from 'faker';

import { log } from 'util';
import UserRepository from '../../repositories/UserRepository';
import { hashPassword } from '../../helpers/passwordHelpers';
import generateUniqueId from '../../helpers/generateUniqueId';

faker.seed(100);

export const seedUsers = (): Promise<void> =>
  new Promise((): void => {
    try {
      let count = 0;
      const numberOfUsers = 50;

      const { city, state, streetAddress, secondaryAddress, streetName } = faker.address;

      lodash.times(numberOfUsers, async () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email(firstName, lastName).toLowerCase();
        const phone = faker.phone.phoneNumber();
        const password = '12345';

        const user = await UserRepository.getByEmailOrPhone({ email, phone });

        if (user) {
          return;
        }

        count += 1;

        await UserRepository.create({
          uniqueId: generateUniqueId(),
          phone,
          email,
          password: hashPassword(password),
          accountType: count % 10 === 0 ? 'Merchant' : 'Customer',
          secretKey: `${generateUniqueId()}-${email}`,
          Profile: {
            firstName,
            lastName,
          },
          Address: {
            city: city(),
            state: state(),
            line1: streetAddress(),
            line2: secondaryAddress(),
            landMark: streetName(),
            addressType: count % 10 === 0 ? 'Delivery' : 'Home',
          },
        });
      });
    } catch (error) {
      log(error);
      throw error;
    }
  });
