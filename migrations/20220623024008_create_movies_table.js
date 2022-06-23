/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('movies', (t) => {
        t.boolean('adult')
        t.integer('collection_id').references('collections.id')
        t.integer('budget')
        t.text('homepage')
        t.increments('id').primary()
        t.string('imdb_id')
        t.string('original_language')
        t.text('original_title')
        t.text('overview')
        t.float('popularity')
        t.text('poster_path')
        t.integer('production_companies_id').references('production_companies.id')
        t.date('release_date')
        t.integer('revenue')
        t.float('runtime')
        t.string('status')
        t.text('tagline')
        t.text('title')
        t.boolean('video')
        t.float('vote_average')
        t.integer('vote_count')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movies')
};
