/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('spoken_languages', (t) => {
        t.increments('id').primary()
        t.string('name')
        t.string('iso_639_1')
        t.integer('movie_id').references('movies.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('spoken_languages')
};
