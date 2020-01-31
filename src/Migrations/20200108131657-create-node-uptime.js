var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('NodeUptime', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            isWorking: {
                type: sequelize.BOOLEAN
            },
            nodeId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Nodes',
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
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('NodeUptime');
    }
};
