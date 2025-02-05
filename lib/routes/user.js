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

        const { User } = request.models();

        // Objection retourne des promeses, il ne faut pas oublier des les await.
        const user = await User.query().insertAndFetch({ firstName: request.payload.firstName, lastName: request.payload.lastName });

        return user;
    }
};

const getUsers = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { User } = request.models();
        const users = await User.query();
        return users;
    }
};

module.exports = [postUser, getUsers];