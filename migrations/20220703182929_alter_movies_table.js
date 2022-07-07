/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('movies', (table) => {
        table.dropColumn('production_companies_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('movies', (table) => {
        table.integer('production_companies_id').references('production_companies.id')
    })
};
