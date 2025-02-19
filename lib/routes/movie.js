'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                return await movieService.create(request.payload);
            } catch (error) {
                return h.response({ error: 'Failed to create movie' }).code(500);
            }
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.list();
        }
    },
    {
        method: 'delete',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                await movieService.delete(request.params.id);
                return h.response().code(204);
            } catch (error) {
                if (error.output && error.output.statusCode === 404) {
                    return h.response({ error: error.message }).code(404);
                }
                return h.response({ error: 'Failed to delete movie' }).code(500);
            }
        }
    },
    {
        method: 'patch',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    title: Joi.string().optional(),
                    description: Joi.string().optional(),
                    releaseDate: Joi.date().optional(),
                    director: Joi.string().optional()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                const updatedMovie = await movieService.update(request.params.id, request.payload);
                return h.response(updatedMovie).code(200);
            } catch (error) {
                if (error.output && error.output.statusCode === 404) {
                    return h.response({ error: error.message }).code(404);
                }
                return h.response({ error: 'Failed to update movie' }).code(500);
            }
        }
    }

];