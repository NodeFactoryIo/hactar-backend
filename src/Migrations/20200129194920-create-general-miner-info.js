var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('GeneralMinerInfo', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            version: {
                type: sequelize.STRING
            },
            sectorSize: {
                type: sequelize.BIGINT
            },
            numberOfSectors: {
                type: sequelize.BIGINT
            },
            minerPower: {
                type: sequelize.BIGINT
            },
            totalPower: {
                type: sequelize.BIGINT
            },
            nodeId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Nodes',
                    key: 'id'
                },
                unique: true,
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
        })
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('GeneralMinerInfo');
    }
};
