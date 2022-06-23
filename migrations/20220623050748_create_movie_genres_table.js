/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movie_genres', (t) => {
        t.increments('id').primary()
        t.integer('movie_id').references('movies.id')
        t.integer('genre_id').references('genres.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movie_genres')
};
