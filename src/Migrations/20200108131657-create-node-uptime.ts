import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('NodeUptime', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            isWorking: {
                type: DataTypes.BOOLEAN
            },
            nodeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Nodes',
                    key: 'id'
                }
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
        return queryInterface.dropTable('NodeUptime');
    }
};
