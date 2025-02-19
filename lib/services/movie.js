// iut-project/lib/services/movie.js
'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {
    async create(movie) {
        const { Movie } = this.server.models();
        const { mailService, userService } = this.server.services();

        const newMovie = await Movie.query().insertAndFetch(movie);
        try {
            const users = await userService.list();
            for (const user of users) {
                await mailService.sendNewMovieEmail(user, newMovie);
            }
        } catch (error) {
            console.error('Error sending new movie email:', error);
            return newMovie;
        }
        return newMovie;
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
        const { Movie, Favorite } = this.server.models();
        const { mailService, userService } = this.server.services();
        const updatedMovie = await Movie.query().patchAndFetchById(id, movie);
        if (!updatedMovie) {
            throw Boom.notFound('Movie not found');
        }

        try {
            const favorites = await Favorite.query().where('movieId', id);
            for (const favorite of favorites) {
                const user = await userService.getById(favorite.userId);
                await mailService.sendMovieUpdatedEmail(user, updatedMovie);
            }
        } catch (error) {
            console.error('Error sending movie updated email:', error);
        }

        return updatedMovie;
    }
};