import { seedUsers } from './seedUsers';

const seedAll = async (): Promise<void> => {
  await Promise.all([seedUsers()]);

  process.exit();
};

seedAll();
