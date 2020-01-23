import sequelize from "sequelize";

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('Nodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.DataTypes.INTEGER
            },
            url: {
                type: sequelize.DataTypes.STRING
            },
            token: {
                type: sequelize.DataTypes.STRING
            },
            address: {
                type: sequelize.DataTypes.STRING
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
        return queryInterface.dropTable('Nodes');
    }
};
