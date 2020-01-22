import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                type: DataTypes.STRING
            },
            hash_password: {
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
        return queryInterface.dropTable('Users');
    }
};
