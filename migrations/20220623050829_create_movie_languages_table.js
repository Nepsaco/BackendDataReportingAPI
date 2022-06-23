/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movie_languages', (t) => {
        t.increments('id').primary()
        t.integer('movie_id').references('movies.id')
        t.integer('spoken_languages_id').references('spoken_languages.id')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movie_languages')
};
