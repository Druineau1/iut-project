'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

const postUser = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(8).description('Password'),
                scope: Joi.array().default(['user']).description('User role'),
                mail: Joi.string().default('example@mail.com').email().description('Email address'),
                username: Joi.string().min(3).description('Username'),
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        try {
            return await userService.create(request.payload);
        } catch (error) {
            console.error('Error creating user:', error);
            return h.response({ error: 'Failed to create user' }).code(500);
        }
    }
};

const getUsers = {
    method: 'get',
    path: '/users',
    options: {
        auth : {
            scope: ['admin']
        },
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        try {
            return await userService.list(request.payload);
        } catch (error) {
            console.error('Error fetching users:', error);
            return h.response({ error: 'Failed to fetch users' }).code(500);
        }
    }
};

const deleteUser = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth : {
            scope: [ 'admin' ]
        },
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
        try {
            await userService.delete(userId);
            return h.response().code(204);
        } catch (error) {
            console.error('Error deleting user:', error);
            return h.response({ error: 'Failed to delete user' }).code(500);
        }
    }
};

const patchUser = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth : {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user to update')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).description('Password'),
                scope: Joi.array().description('User role'),
                mail: Joi.string().email().description('Email address'),
                username: Joi.string().min(3).description('Username'),
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const userId = request.params.id;
        const userData = request.payload;

        if (userData.password) {
            const saltRounds = 10;
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }

        try {
            return await userService.patch(userId, userData);;
        } catch (error) {
            console.error('Error updating user:', error);
            return h.response({ error: 'Failed to update user' }).code(500);
        }
    }
};

const authUser = {
    method: 'post',
    path: '/user/login',
    options: {
        auth:false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().email().required().description('Email address'),
                password: Joi.string().required().description('Password'),
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        try {
            return await userService.auth(request.payload);
        } catch (error) {
            console.error('Error authenticating user:', error);
            return h.response({ error: 'Failed to authenticate user' }).code(500);
        }
    },
};

module.exports = [postUser, getUsers, deleteUser, patchUser, authUser];