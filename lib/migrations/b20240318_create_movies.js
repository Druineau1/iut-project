'use strict';

exports.up = async (knex) => {
    await knex.schema.createTable('movies', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.date('releaseDate').notNullable();
        table.string('director').notNullable();
        table.dateTime('createdAt').notNullable();
        table.dateTime('updatedAt').notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('movies');
};