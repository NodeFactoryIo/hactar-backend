var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('Nodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            url: {
                type: sequelize.STRING(128)
            },
            token: {
                type: sequelize.STRING(150)
            },
            address: {
                type: sequelize.STRING(128)
            },
            userId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DATE
            }
        },
            {
                uniqueKeys: {
                    actions_unique: {
                        fields: ['url', 'token', 'address']
                    }
                }
            })
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('Nodes');
    }
};
