/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('production_countries', (t) => {
        t.increments('id').primary()
        t.string('name')
        t.string('iso_3166_1')
        t.integer('movie_id').references('movies.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('production_countries')
};
