var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('NodePastDeals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            cid: {
                type: sequelize.STRING
            },
            state: {
                type: sequelize.INTEGER
            },
            size: {
                type: sequelize.STRING
            },
            provider: {
                type: sequelize.STRING
            },
            price: {
                type: sequelize.STRING
            },
            duration: {
                type: sequelize.INTEGER
            },
            nodeId: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Nodes',
                    key: 'id'
                },
                unique: false,
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
        return queryInterface.dropTable('NodePastDeals');
    }
};
