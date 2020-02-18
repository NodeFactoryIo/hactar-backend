// eslint-disable-next-line
const bcrypt = require("bcryptjs");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'john@test.com',
            // eslint-disable-next-line
            hash_password: bcrypt.hashSync('password', 10),
            createdAt: new Date('2018-05-11T00:06:37').toLocaleString(),
            updatedAt: new Date('2018-05-11T00:06:37').toLocaleString()
        },
            {
                email: 'mark@test.com',
                // eslint-disable-next-line
                hash_password: bcrypt.hashSync('secret password', 10),
                createdAt: new Date('2019-07-10T13:35:56').toLocaleString(),
                updatedAt: new Date('2019-07-10T13:35:56').toLocaleString()
            },
            {
                email: 'steve@test.com',
                // eslint-disable-next-line
                hash_password: bcrypt.hashSync('secret password', 10),
                createdAt: new Date('2019-07-10T13:35:57').toLocaleString(),
                updatedAt: new Date('2019-07-10T13:35:57').toLocaleString()
            },
            {
                email: 'donna@test.com',
                // eslint-disable-next-line
                hash_password: bcrypt.hashSync('secret password', 10),
                createdAt: new Date('2019-07-10T13:35:58').toLocaleString(),
                updatedAt: new Date('2019-07-10T13:35:58').toLocaleString()
            }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
