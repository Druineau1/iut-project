'use strict';

const Joi = require('joi')

const postUser = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
};

const getUsers = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.list(request.payload);
    }
};

const deleteUser = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user to delete')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const userId = request.params.id;
        await userService.delete(userId);
        return [];
    }
};

module.exports = [postUser, getUsers, deleteUser];
