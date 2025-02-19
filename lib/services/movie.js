'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {
    async create(movie) {
        const { Movie } = this.server.models();
        return await Movie.query().insert(movie);
    }

    async list() {
        const { Movie } = this.server.models();
        return await Movie.query();
    }

    async delete(id) {
        const { Movie } = this.server.models();
        const deleted = await Movie.query().deleteById(id);
        if (!deleted) {
            throw Boom.notFound('Movie not found');
        }
        return deleted;
    }

    async update(id, movie) {
        const { Movie } = this.server.models();
        const updated = await Movie.query().patchAndFetchById(id, movie);
        if (!updated) {
            throw Boom.notFound('Movie not found');
        }
        return updated;
    }
};