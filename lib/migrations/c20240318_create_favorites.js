'use strict';

exports.up = async (knex) => {
    await knex.schema.dropTableIfExists('favorites');
    await knex.schema.createTable('favorites', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable();
        table.integer('movieId').unsigned().notNullable();
        table.dateTime('createdAt').notNullable();
        table.foreign('userId').references('id').inTable('user').onDelete('CASCADE');
        table.foreign('movieId').references('id').inTable('movies').onDelete('CASCADE');
        table.unique(['userId', 'movieId']);
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('favorites');
};