// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/BackendDataReportingAPI',
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: './seeds'
    },
    pool: {min: 0, max: 7}
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: './seeds'
    },
  }
};
