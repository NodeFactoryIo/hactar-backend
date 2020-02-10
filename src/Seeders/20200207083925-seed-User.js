
// eslint-disable-next-line
const bcrypt = require("bcryptjs");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'john@test.com',
            // eslint-disable-next-line
            hash_password: bcrypt.hashSync('password', 10),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            email: 'mark@test.com',
            // eslint-disable-next-line
            hash_password: bcrypt.hashSync('secret password', 10),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
