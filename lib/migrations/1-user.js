'use strict';

module.exports = {
    async up(knex) {
        const hasPassword = await knex.schema.hasColumn('user', 'password');
        const hasMail = await knex.schema.hasColumn('user', 'mail');
        const hasUsername = await knex.schema.hasColumn('user', 'username');

        return knex.schema.alterTable('user', function(table) {
            if (!hasPassword) {
                table.string('password').notNullable();
            }
            if (!hasMail) {
                table.string('mail').notNullable().unique();
            }
            if (!hasUsername) {
                table.string('username').notNullable().unique();
            }
        });
    },

    async down(knex) {
        return knex.schema.alterTable('user', function(table) {});
    }
};