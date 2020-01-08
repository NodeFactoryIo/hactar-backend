import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('Nodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            url: {
                type: DataTypes.STRING
            },
            token: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('Nodes');
    }
};
