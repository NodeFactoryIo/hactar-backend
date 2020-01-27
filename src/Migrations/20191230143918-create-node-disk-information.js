var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('NodeDiskInformation', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            freeSpace: {
                type: sequelize.BIGINT
            },
            takenSpace: {
                type: sequelize.BIGINT
            },
            nodeId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Nodes',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DataTypes.DATE
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('NodeDiskInformation');
    }
};
