var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('UptimeNotifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            nodeUptimeId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'NodeUptime',
                    key: 'id'
                },
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DATE
            }
        })
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('UptimeNotifications');
    }
};
