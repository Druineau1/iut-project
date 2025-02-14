'use strict';

const { Service } = require('@hapipal/schmervice');
const bcrypt = require('bcrypt');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        return User.query().insertAndFetch(user);
    }

    list() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    patch(id, user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(id, user);
    }

    async auth(user) {
        const { User } = this.server.models();
        const userFound = await User.query().findOne({ mail: user.mail });

        if (!userFound) {
            return Promise.reject(new Error('Invalid email'));
        }

        const isPasswordValid = await bcrypt.compare(user.password, userFound.password);
        if (!isPasswordValid) {
            return Promise.reject(new Error('Invalid password'));
        }

        return userFound;
    }
};