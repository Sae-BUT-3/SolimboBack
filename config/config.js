require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERBAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DATABASE_USERBAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DATABASE_USERBAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
  }
};
