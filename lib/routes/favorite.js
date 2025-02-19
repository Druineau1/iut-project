'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/favorites',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return await favoriteService.listFavorites(request.auth.credentials.id);
        }
    },
    {
        method: 'post',
        path: '/favorites/{movieId}',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            try {
                const favorite = await favoriteService.addFavorite(request.auth.credentials.id, request.params.movieId);
                return h.response(favorite).code(201);
            } catch (error) {
                if (error.message === 'Movie already in favorites') {
                    return h.response({ error: error.message }).code(400);
                }
                return h.response({ error: 'Failed to add favorite' }).code(500);
            }
        }
    },
    {
        method: 'delete',
        path: '/favorites/{movieId}',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            try {
                await favoriteService.removeFavorite(request.auth.credentials.id, request.params.movieId);
                return h.response().code(204);
            } catch (error) {
                if (error.message === 'Movie not in favorites') {
                    return h.response({ error: error.message }).code(404);
                }
                return h.response({ error: 'Failed to remove favorite' }).code(500);
            }
        }
    }
];