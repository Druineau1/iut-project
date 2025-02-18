'use strict';

exports.up = async (knex) => {
    await knex.schema.table('user', (table) => {
        table.jsonb('scope').notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.table('user', (table) => {
        table.dropColumn('scope');
    });
};