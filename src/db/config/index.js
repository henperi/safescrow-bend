const dotenv = require('dotenv');

dotenv.config();

const logQueries = process.env.NODE_ENV === 'production' && {
  logging: false,
};

module.exports = {
  test: {
    use_env_variable: 'TEST_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  development: {
    use_env_variable: 'DEV_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  staging: {
    use_env_variable: 'DEV_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  production: {
    use_env_variable: 'PROD_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  local: {
    use_env_variable: 'LOCAL_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
};
