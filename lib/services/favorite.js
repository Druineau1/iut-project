'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {
    async addFavorite(userId, movieId) {
        const { Favorite } = this.server.models();

        const existing = await Favorite.query()
            .where({ userId, movieId })
            .first();

        if (existing) {
            throw Boom.badRequest('Movie already in favorites');
        }

        return await Favorite.query().insert({ userId, movieId });
    }

    async removeFavorite(userId, movieId) {
        const { Favorite } = this.server.models();

        const deleted = await Favorite.query()
            .where({ userId, movieId })
            .delete();

        if (!deleted) {
            throw Boom.notFound('Movie not in favorites');
        }
    }

    async listFavorites(userId) {
        const { Favorite, Movie } = this.server.models();

        return await Favorite.query()
            .where('userId', userId)
            .skipUndefined();
    }
};