var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('NodeBalance', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            balance: {
                type: sequelize.STRING
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
                type: sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DataTypes.DATE
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('NodeBalance');
    }
};
