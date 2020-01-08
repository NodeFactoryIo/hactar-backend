import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('DiskInformations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            freeSpace: {
                type: DataTypes.STRING
            },
            takenSpace: {
                type: DataTypes.STRING
            },
            nodeId: {
                type: DataTypes.NUMBER,
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
        return queryInterface.dropTable('DiskInformations');
    }
};
