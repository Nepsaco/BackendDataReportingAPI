/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movie_production_companies', (t) => {
        t.increments('id').primary()
        t.integer('movie_id').references('movies.id')
        t.integer('production_companies_id').references('production_companies.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movie_production_companies')
};
