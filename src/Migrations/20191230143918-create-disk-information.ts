import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('DiskInformation', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            freeSpace: {
                type: DataTypes.BIGINT
            },
            takenSpace: {
                type: DataTypes.BIGINT
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
        return queryInterface.dropTable('DiskInformation');
    }
};
