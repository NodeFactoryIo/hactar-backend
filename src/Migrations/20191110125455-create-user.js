var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            email: {
                type: sequelize.STRING
            },
            hash_password: {
                type: sequelize.STRING(128)
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DATE
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
