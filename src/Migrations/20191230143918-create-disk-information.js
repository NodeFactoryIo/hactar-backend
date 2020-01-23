import sequelize from "sequelize";

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('DiskInformation', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.DataTypes.INTEGER
            },
            freeSpace: {
                type: sequelize.DataTypes.BIGINT
            },
            takenSpace: {
                type: sequelize.DataTypes.BIGINT
            },
            nodeId: {
                type: sequelize.DataTypes.INTEGER,
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
        return queryInterface.dropTable('DiskInformation');
    }
};
